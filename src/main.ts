import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { addHeaders } from 'src/middlewares/add-headers.middleware';
import { BetterValidationPipe } from 'src/pipes/better-validator.pipe';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Exercise.log')
    .setDescription('The Exercise.log API documentation')
    .setVersion('1.0')
    .addServer('https://exercise-log-nest.herokuapp.com', 'Heroku')
    .addServer('http://localhost:3000', 'Local')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  fs.writeFileSync(`${__dirname}/../swagger.json`, JSON.stringify(document));
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new BetterValidationPipe());

  app.enableCors({
    origin: ['http://localhost:4200', 'https://archie-arrow.github.io'],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'PATCH', 'HEAD'],
  });

  app.use(addHeaders);

  await app.listen(PORT, () => console.log(`Server started on ${PORT} port`));
}

bootstrap();
