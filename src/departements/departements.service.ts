import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Departement } from './entities/departements.entity';

@Injectable()
export class DepartementsService {
  constructor(
    @InjectRepository(Departement)
    private departementsRepository: Repository<Departement>,
  ) {}

  create(data: Partial<Departement>) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const dept = this.departementsRepository.create(data);
    return this.departementsRepository.save(dept);
  }

  findAll() {
    return this.departementsRepository.find();
  }

  async remove(id: number) {
    await this.departementsRepository.delete(id);
    return { message: `Département ${id} supprimé` };
  }
}
