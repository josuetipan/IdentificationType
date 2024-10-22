import { MiddlewareConsumer, Module } from '@nestjs/common';
import { IdentificationTypeController } from '../controllers/v1/Identification.controller';
import { PrismaService } from 'src/core/application/prisma/prisma.service';
import { LoggerModule } from 'src/core/application/loggger/logger.module';
import { IdenditicatioService } from 'src/core/application/services/identification.service';
import { Identification } from '../../../domain/identification.entity';

@Module({
  imports: [LoggerModule.register(process.env.USE_KAFKA === 'true')],
  controllers:[IdentificationTypeController],
  providers: [IdenditicatioService, PrismaService],
})
export class IdentificationModule {}
