import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../users/entities/user.entity';
import { Ouvrier } from '../ouvriers/entities/ouvrier.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Ouvrier]),
    JwtModule.register({
      secret: 'secret_key_readdlytech',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
