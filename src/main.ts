import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './core/application/loggger/logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { appConfig } from './utils/config/app.config';
import { ValidationExceptionFilter } from './core/application/exceptions/validator.exception';

async function bootstrap() {
  //Establecer logger e inicializar NEST
  const logger = new LoggerService();
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(),
  });
  // Validaciones
  app.useGlobalPipes(new ValidationPipe());
  //Configurar el swaggwer
  const config = new DocumentBuilder()
    .setTitle('User Microservicie')
    .setDescription(`Microservicio de usuario para el modo ${appConfig.mode}`)
    .setVersion('1.0')
    .build();
  app.useGlobalFilters(new ValidationExceptionFilter(logger));
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  //Levantar Microservicio
  await app.listen(appConfig.port);
  logger.log(
    `🚀 Microservice started on port ${appConfig.port} in ${appConfig.mode.toUpperCase()} mode`,
  );
}
bootstrap();
