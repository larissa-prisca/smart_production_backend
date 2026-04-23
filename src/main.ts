import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      // Autorise les requêtes sans Origin (comme celles du Raspberry Pi / Python)
      if (!origin) return callback(null, true);
      
      const allowedOrigins = [
        'http://localhost:3000',
        'https://smartproduction.duckdns.org',
        'https://smart-production-frontend.vercel.app',
      ];
      
      if (allowedOrigins.indexOf(origin) !== -1 || origin.includes('vercel.app')) {
        callback(null, true);
      } else {
        callback(null, true); // On autorise tout temporairement pour débloquer ton Pi
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(process.env.PORT || 3001, '0.0.0.0');
  console.log('✅ Backend démarré sur port', process.env.PORT || 3001);
}

bootstrap();
