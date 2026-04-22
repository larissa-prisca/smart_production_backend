import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Ouvrier } from '../ouvriers/entities/ouvrier.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  // Variable pour mémoriser l'ouvrier qui travaille au poste (Session)
  private currentActiveWorker: any = null;

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Ouvrier)
    private ouvriersRepository: Repository<Ouvrier>,
    private jwtService: JwtService,
  ) {}

  // 1. Retourne l'ouvrier mémorisé (Appelé par ton script Python)
  getCurrentWorker() {
    return this.currentActiveWorker;
  }

  // 2. Valide le badge RFID et mémorise l'ouvrier (Appelé par l'ESP32)
  async validateRfidLogin(uid: string) {
    // On cherche dans les deux colonnes possibles par sécurité
    const ouvrier = await this.ouvriersRepository.findOne({ 
      where: [
        { rfid: uid }, 
        { badgeRFID: uid }
      ] 
    });
    
    if (!ouvrier) return null;

    // Mise à jour de la date de présence
    ouvrier.dernierePresence = new Date();
    await this.ouvriersRepository.save(ouvrier);

    // On stocke cet ouvrier comme "Actif" pour le script YOLO
    this.currentActiveWorker = ouvrier;
    
    return ouvrier;
  }

  // 3. Login classique pour le Dashboard (Email/Password)
  async login(email: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user)
      throw new UnauthorizedException('Email ou mot de passe incorrect');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Email ou mot de passe incorrect');

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
        departement: user.departement,
      },
    };
  }

  // 4. Inscription d'un nouvel utilisateur
  async register(
    nom: string,
    prenom: string,
    email: string,
    password: string,
    role: string,
    departement?: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      nom,
      prenom,
      email,
      password: hashedPassword,
      role,
      departement,
    });
    const savedUser = await this.usersRepository.save(user);
    return {
      id: savedUser.id,
      nom: savedUser.nom,
      prenom: savedUser.prenom,
      email: savedUser.email,
      role: savedUser.role,
      departement: savedUser.departement,
    };
  }

  // 5. Login RFID avec génération de Token JWT (si besoin pour le web)
  async rfidLogin(rfid: string) {
    const ouvrier = await this.ouvriersRepository.findOne({ where: { rfid } });
    if (!ouvrier) throw new UnauthorizedException('Badge non reconnu');

    ouvrier.dernierePresence = new Date();
    await this.ouvriersRepository.save(ouvrier);

    const payload = { sub: ouvrier.id, rfid: ouvrier.rfid, role: 'operateur' };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: ouvrier.id,
        nom: ouvrier.nom,
        prenom: ouvrier.prenom,
        role: 'operateur',
        rfid: ouvrier.rfid,
        departement: ouvrier.departement,
      },
    };
  }
}