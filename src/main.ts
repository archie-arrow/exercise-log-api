import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BetterValidationPipe } from 'src/pipes/better-validator.pipe';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Exercise.log')
    .setDescription('The Exercise.log API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new BetterValidationPipe());

  app.enableCors({
    origin: '*',
    methods: ['PUT', 'POST', 'GET', 'PATCH', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested', 'Content-Type', 'Accept Authorization'],
  });

  await app.listen(PORT, () => console.log(`Server started on ${PORT} port`));
}

bootstrap();
