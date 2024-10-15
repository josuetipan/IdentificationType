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
import { User } from 'src/core/domain/user.entity';
import { SendData } from '../dto/sendData-user.dto';
import { apiBaseEntityName } from 'src/utils/api/apiExceptionConfig';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {}

  async create(data: CreateUserDto): Promise<object> {
    const userExists = await this.prisma.users.findMany({
      where: { email: data.email },
    });
    if (userExists.length > 0) {
      this.logger.error('Email is already in use: ' + data.email);
      throw new ConflictException('Email is already in use: ' + data.email);
    }
    try {
      const users = await this.prisma.users.create({
        data: {
          name: data.name,
          email: data.email,
        },
      });
      this.logger.log(`${apiBaseEntityName} successfully created: ${JSON.stringify(users)}`);
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`);
      throw new BadRequestException('Error creating user');
    }
    return { message: `${apiBaseEntityName} successfully created` };
  }

  async findAll(limit: string, page: string): Promise<SendData | User[]> {
    const pageQuery = limit && page ? page : (page = '1');
    if (limit) {
      const usersQuery = await this.prisma.users.findMany({
        take: parseInt(limit),
        skip: (parseInt(pageQuery) - 1) * parseInt(limit),
      });
      const total = await this.prisma.users.count();
      return {
        data: usersQuery,
        limit: limit,
        page: page,
        totalPages: Math.ceil(total / parseInt(limit)).toString(),
      };
    } else {
      const users = await this.prisma.users.findMany();
      return users;
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.prisma.users.findUnique({ where: { id: id } });
      if (user === null) {
        throw new NotFoundException(`${apiBaseEntityName} not found for ID: ${id}`);
      }
      return user;
    } catch (error) {
      // Aquí puedes lanzar una excepción diferente si es necesario, pero asegurate de que sea NotFoundException
      throw new NotFoundException(`${apiBaseEntityName} not found for ID: ${id}`);
    }
  }
  

  async update(id: string, data: UpdateUserDto): Promise<User> {
    return this.prisma.users.update({
      where: { id: id },
      data: {
        name: data.name,
        email: data.email,
      },
    });
  }

  async delete(id: string): Promise<User> {
    return this.prisma.users.delete({ where: { id } });
  }
}
