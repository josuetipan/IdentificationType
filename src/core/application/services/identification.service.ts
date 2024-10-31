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
import { IdentificationResponse } from '../dtos/identification.dto';

@Injectable()
export class IdenditicatioService {
  constructor(
    private prisma: PrismaService,
    private logger:LoggerKafkaService ,
    //private logger:LoggerService ,
  ) {}


  async findAll(method: Request): Promise<IdentificationResponse[]> {
    const identification = await this.prisma.identification_types.findMany()
    const formattedIdentifications:IdentificationResponse[] = identification.map(record => {
      return {
          identificationId: record.id_identification_type, // Cambiamos el nombre de la propiedad
          name: record.name,
      };
  });
    this.logger.log(JSON.stringify(formattedIdentifications), method.url, apiBaseEntityName)
    return formattedIdentifications;
  }
}
