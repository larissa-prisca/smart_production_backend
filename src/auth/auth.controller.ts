import { Controller, Post, Body, UnauthorizedException, Get, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 1. Login via RFID (Appelé par l'ESP32)
  @Post('login-rfid')
  async loginRfid(@Body() body: { uid: string }) {
    const worker = await this.authService.validateRfidLogin(body.uid);
    if (!worker) {
      throw new UnauthorizedException('Badge inconnu');
    }
    return { status: 'success', worker: worker.nom };
  }

  // 2. Récupérer l'ouvrier actuel (Appelé par Python)
  @Get('current-worker')
  getCurrent() {
    const worker = this.authService.getCurrentWorker();
    if (!worker) {
      throw new NotFoundException('Aucun ouvrier au poste');
    }
    return worker;
  }

  // 3. Login Classique (Email/Password)
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  // 4. Inscription
  @Post('register')
  async register(
    @Body()
    body: {
      nom: string;
      prenom: string;
      email: string;
      password: string;
      role: string;
      departement?: string;
    },
  ) {
    return this.authService.register(
      body.nom,
      body.prenom,
      body.email,
      body.password,
      body.role,
      body.departement,
    );
  }

  // 5. Autre route RFID si nécessaire
  @Post('rfid-login')
  async rfidLogin(@Body() body: { rfid: string }) {
    return this.authService.rfidLogin(body.rfid);
  }
} // UNE SEULE ACCOLADE ICI À LA FIN