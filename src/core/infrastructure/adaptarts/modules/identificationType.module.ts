import { MiddlewareConsumer, Module } from '@nestjs/common';
import { IdentificationTypeController } from '../controllers/v1/identificationType.controller';
import { PrismaService } from 'src/core/application/prisma/prisma.service';
import { LoggerModule } from 'src/core/application/loggger/logger.module';
import { IdenditicatioService } from 'src/core/application/services/identification.service';
import { HttpModule } from '@nestjs/axios';
import { AuthGuardModule } from 'auth-guard-michimoney';
import { AuthConfig } from 'auth-guard-michimoney/dist/auth-config.dto';
import { ConfigService } from '@nestjs/config';
import { LoggerKafkaService } from 'src/core/application/loggger/loggerKafka.service';

@Module({
  imports: [
    LoggerModule.register(process.env.USE_KAFKA === 'true'),
    HttpModule,
    AuthGuardModule.registerAsync(), // Proporciona la configuración aquí*/
    ],
  controllers:[IdentificationTypeController],
  providers: [IdenditicatioService, PrismaService,ConfigService],
})
export class IdentificationModule {}
