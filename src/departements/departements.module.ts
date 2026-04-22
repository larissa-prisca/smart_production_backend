import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartementsService } from './departements.service';
import { DepartementsController } from './departements.controller';
import { Departement } from './entities/departements.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Departement])],
  controllers: [DepartementsController],
  providers: [DepartementsService],
})
export class DepartementsModule {}
