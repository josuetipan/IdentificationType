import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoggerService } from '../loggger/logger.service';
import { User } from 'src/core/domain/user.entity';
import { SendData } from '../dto/sendData-user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {}

  async create(data: CreateUserDto): Promise<object> {
    console.log(data);
    const userExists = await this.prisma.users.findMany({
      where: { email: data.email },
    });
    console.log(userExists);
    if (userExists.length > 0) {
      this.logger.error('El correo ya esta en uso: ' + data.email);
      throw new ConflictException('El correo ya está en uso :' + data.email);
    }
    try {
      const users = await this.prisma.users.create({
        data: {
          name: data.name,
          email: data.email,
        },
      });
      this.logger.log(`Usuario creado correctamente: ${JSON.stringify(users)}`);
    } catch (error) {
      console.log(error);
      this.logger.error(`Error al crear el usuario: ${error.message}`);
      throw new BadRequestException('Error al crear el usuario');
    }
    return { mesage: 'Usuario creado correctamente' };
  }
  async findAll(limit: string, page: string): Promise<SendData> {
    const pageQuery = limit && page ? page : (page = '1');
    if (limit) {
      const usersQuery = await this.prisma.users.findMany({
        take: parseInt(limit),
        skip: (parseInt(pageQuery) - 1) * parseInt(limit),
      });
      return {
        data: usersQuery,
        limit: limit,
        page: page,
      };
    } else {
      const users = await this.prisma.users.findMany();
      return {
        data: users,
      };
    }
  }
  async findOne(id: string): Promise<User> {
    return this.prisma.users.findUnique({ where: { id: id } });
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
