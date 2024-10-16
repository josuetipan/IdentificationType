import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoggerService } from '../loggger/logger.service';
import { Identification } from 'src/core/domain/identification.entity';
import { apiBaseEntityName, apiMethodsName } from 'src/utils/api/apiExceptionConfig';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {}


  async findAll(): Promise<Identification[]> {
    const identifiction = await this.prisma.identificationTypes.findMany()
    this.logger.log(JSON.stringify(identifiction))
    return identifiction;
  }
}
