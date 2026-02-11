import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('Restaurant API')
    .setDescription('API de gestion de restaurant')
    .setVersion('1.0')
    .build();
  
   // Activer CORS
  app.enableCors({
    origin: ['https://my-crud-app-front-1058342834957.europe-west1.run.app'], // URL du front
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document); // Disponible sur la route racine
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((error) => {
  console.error('Error starting the application:', error);
  process.exit(1);
});
