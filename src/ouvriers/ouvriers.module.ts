import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OuvriersService } from './ouvriers.service';
import { OuvriersController } from './ouvriers.controller';
import { Ouvrier } from './entities/ouvrier.entity';
import { EventsModule } from '../events/events.module';
import { Qualite } from 'src/qualite/entities/qualite.entity';
import { QualiteController } from 'src/qualite/qualite.controller';
import { QualiteService } from 'src/qualite/qualite.service';
import { QualiteModule } from 'src/qualite/qualite.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ouvrier]), EventsModule,QualiteModule,],
  controllers: [OuvriersController],
  providers: [OuvriersService],
  exports: [OuvriersService], 
})
export class OuvriersModule {}
