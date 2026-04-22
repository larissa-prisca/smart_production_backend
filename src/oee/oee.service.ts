import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Production } from '../production/entities/production.entity';

@Injectable()
export class OeeService {
  constructor(
    @InjectRepository(Production)
    private productionRepository: Repository<Production>,
  ) {}

  async calculerOee() {
    const productions = await this.productionRepository.find();

    const totalProduit = productions.reduce(
      (sum, p) => sum + p.quantiteProduite,
      0,
    );
    const totalConforme = productions.reduce(
      (sum, p) => sum + p.quantiteConforme,
      0,
    );

    const qualite = totalProduit > 0 ? (totalConforme / totalProduit) * 100 : 0;
    const disponibilite = 85;
    const performance = 90;
    const oee = (disponibilite * performance * qualite) / 10000;

    return {
      disponibilite: disponibilite.toFixed(2) + '%',
      performance: performance.toFixed(2) + '%',
      qualite: qualite.toFixed(2) + '%',
      oee: oee.toFixed(2) + '%',
      totalProduit,
      totalConforme,
      totalNonConforme: totalProduit - totalConforme,
    };
  }
}
