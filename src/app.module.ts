import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OuvriersModule } from './ouvriers/ouvriers.module';
import { DepartementsModule } from './departements/departements.module';
import { ProductionModule } from './production/production.module';
import { QualiteModule } from './qualite/qualite.module';
import { OeeModule } from './oee/oee.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    AuthModule,
    UsersModule,
    OuvriersModule,
    DepartementsModule,
    ProductionModule,
    QualiteModule,
    OeeModule,
    EventsModule,
  ],
})
export class AppModule {}
