import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QualiteService } from './qualite.service';
import { QualiteController } from './qualite.controller';
import { Qualite } from './entities/qualite.entity';
import { EventsModule } from '../events/events.module'; // 1. Importe ton module d'événements

@Module({
  imports: [
    TypeOrmModule.forFeature([Qualite]),
    EventsModule, // 2. Ajoute-le ici pour que QualiteService puisse utiliser le Gateway
  ],
  controllers: [QualiteController],
  providers: [QualiteService],
  exports: [QualiteService], // Optionnel : permet à d'autres modules d'utiliser ce service
})
export class QualiteModule {}