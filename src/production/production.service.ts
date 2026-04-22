import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { Production } from './entities/production.entity';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class ProductionService {
  constructor(
    @InjectRepository(Production)
    private productionRepository: Repository<Production>,
    private eventsGateway: EventsGateway,
  ) {}

  async create(createProductionDto: CreateProductionDto) {
    const production = this.productionRepository.create({
      reference: createProductionDto.reference,
      quantiteProduite: createProductionDto.quantiteProduite,
      quantiteConforme: createProductionDto.quantiteConforme,
      quantiteNonConforme: createProductionDto.quantiteNonConforme,
      ouvrier: { id: createProductionDto.ouvrierId },
    });
    const saved = await this.productionRepository.save(production);

    // Récupérer avec les relations pour le WebSocket
    const full = await this.productionRepository.findOne({
      where: { id: saved.id },
      relations: ['ouvrier'],
    });

    // Émettre en temps réel
    this.eventsGateway.emitNouvelleProduction(full);

    // Émettre OEE mis à jour
    const oeeData = await this.calculerOEE();
    this.eventsGateway.emitOEE(oeeData);

    return full;
  }

  findAll() {
    return this.productionRepository.find({
      relations: ['ouvrier'],
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: number) {
    return this.productionRepository.findOne({
      where: { id },
      relations: ['ouvrier'],
    });
  }

  async update(id: number, updateProductionDto: UpdateProductionDto) {
    await this.productionRepository.update(id, updateProductionDto);
    return this.productionRepository.findOne({
      where: { id },
      relations: ['ouvrier'],
    });
  }

  async remove(id: number) {
    await this.productionRepository.delete(id);
    return { message: `Production ${id} supprimée avec succès` };
  }

  async calculerOEE() {
    const productions = await this.productionRepository.find();
    const totalProduit = productions.reduce(
      (acc, p) => acc + p.quantiteProduite,
      0,
    );
    const totalConforme = productions.reduce(
      (acc, p) => acc + p.quantiteConforme,
      0,
    );
    const totalNonConforme = productions.reduce(
      (acc, p) => acc + p.quantiteNonConforme,
      0,
    );
    const qualite = totalProduit > 0 ? (totalConforme / totalProduit) * 100 : 0;
    return {
      totalProduit,
      totalConforme,
      totalNonConforme,
      qualite: `${qualite.toFixed(1)}%`,
      oee: `${(qualite * 0.9).toFixed(1)}%`,
    };
  }
}
