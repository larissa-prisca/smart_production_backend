import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      // Autorise les requêtes sans Origin (comme celles du Raspberry Pi / Python)
      if (!origin) {
        callback(null, true);
        return;
      }
      
      const allowedOrigins = [
        'http://localhost:3000',
        'https://smartproduction.duckdns.org',
        'https://smart-production-frontend.vercel.app',
      ];
      
      const isAllowed = allowedOrigins.includes(origin) || origin.endsWith('.vercel.app');
      
      if (isAllowed) {
        callback(null, true);
      } else {
        // En phase de dev, on accepte tout si ce n'est pas dans la liste
        callback(null, true); 
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  
  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0');
  console.log(`✅ Backend démarré sur port ${port}`);
}

bootstrap();
