import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQualiteDto } from './dto/create-qualite.dto';
import { UpdateQualiteDto } from './dto/update-qualite.dto';
import { Qualite } from './entities/qualite.entity';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class QualiteService {
  // On mémorise l'ID de l'ouvrier qui a badgé au RFID (par défaut 1)
  private static ouvrierActuelId: number = 1;

  constructor(
    @InjectRepository(Qualite)
    private qualiteRepository: Repository<Qualite>,
    private readonly eventsGateway: EventsGateway,
  ) {}

  /**
   * Cette méthode sera appelée par ton OuvrierController 
   * dès que l'Arduino envoie un badge valide.
   */
  setOuvrierActuel(id: number) {
    QualiteService.ouvrierActuelId = id;
    console.log(`👤 Session active mise à jour pour l'ouvrier ID: ${id}`);
  }

  // Création via IA (Caméra)
  async create(createQualiteDto: CreateQualiteDto) {
    // On utilise l'ID envoyé par l'IA, ou à défaut, celui du dernier badge RFID
    const idAUtiliser = createQualiteDto.ouvrierId || QualiteService.ouvrierActuelId;

    const nouvelleQualite = this.qualiteRepository.create({
      reference: createQualiteDto.reference,
      statutIA: createQualiteDto.statutIA,
      sourceDecision: 'IA',
      typeDefaut: createQualiteDto.typeDefaut,
      scoreConfiance: createQualiteDto.scoreConfiance,
      ouvrierId: idAUtiliser, // Attribution automatique ici
    });

    const saved = await this.qualiteRepository.save(nouvelleQualite);

    const qualiteComplete = await this.qualiteRepository.findOne({
      where: { id: saved.id },
      relations: ['ouvrier'],
    });

    if (!qualiteComplete) return saved;

    // Envois temps réel
    if (qualiteComplete.statutIA === 'non_conforme') {
      this.eventsGateway.emitAlerteDefaut(qualiteComplete);
    }
    this.eventsGateway.emitNouvelleProduction(qualiteComplete);

    return qualiteComplete;
  }

  // --- Reste des méthodes inchangées ---

  async corrigerDecision(id: number, nouveauStatutIA: string, typeDefaut?: string) {
    await this.qualiteRepository.update(id, {
      statutIA: nouveauStatutIA,
      sourceDecision: 'ouvrier',
      typeDefaut,
    });
    
    const updated = await this.findOne(id);
    if (updated) this.eventsGateway.emitNouvelleProduction(updated);
    return updated;
  }

  findAll() {
    return this.qualiteRepository.find({
      relations: ['ouvrier'],
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: number) {
    return this.qualiteRepository.findOne({
      where: { id },
      relations: ['ouvrier'],
    });
  }

  findByStatut(statut: string) {
    return this.qualiteRepository.find({
      where: { statutIA: statut },
      relations: ['ouvrier'],
    });
  }

  async update(id: number, updateQualiteDto: UpdateQualiteDto) {
    await this.qualiteRepository.update(id, updateQualiteDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.qualiteRepository.delete(id);
    return { message: `Qualite ${id} supprimée` };
  }
}