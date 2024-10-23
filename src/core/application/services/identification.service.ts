import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoggerService } from '../loggger/logger.service';
import { Identification } from 'src/core/domain/identificationType.entity';
import { LoggerKafkaService } from '../loggger/loggerKafka.service';
import { apiBaseEntityName } from 'src/utils/api/apiEntites';

@Injectable()
export class IdenditicatioService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerKafkaService ,
  ) {}


  async findAll(method): Promise<Identification[]> {
    const identification = await this.prisma.identification_types.findMany()
    const formattedIdentifications = identification.map(record => {
      return {
          id: record.id_identification_type, // Cambiamos el nombre de la propiedad
          name: record.name,
          code : record.code_identification
      };
  });
    this.logger.log(JSON.stringify(formattedIdentifications))
    return formattedIdentifications;
  }
}
