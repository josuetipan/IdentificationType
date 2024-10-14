import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoggerService } from '../loggger/logger.service';
import { User } from 'src/core/domain/user.entity';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {}

  async create(data: CreateUserDto): Promise<object> {
    console.log(data);
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
      if (error.meta.target) {
        throw new Error('Error con' + error.meta.target);
      }
      this.logger.error(`Error al crear el usuario: ${error.message}`);
      throw new BadRequestException('Error al crear el usuario');
    }
    return { mesage: 'Usuario creado correctamente' };
  }
  async findAll(limit: string): Promise<User[]> {
    if (limit) {
      return this.prisma.users.findMany({
        take: parseInt(limit),
      });
    } else {
      return this.prisma.users.findMany();
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
