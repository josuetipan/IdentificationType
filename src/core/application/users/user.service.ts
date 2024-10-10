import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from 'src/core/domain/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoggerService } from '../loggger/logger.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {}

  async create(data: CreateUserDto): Promise<object> {
    try {
      const user = await this.prisma.user.create({
        data: data,
      });
      this.logger.log(`Usuario creado correctamente: ${JSON.stringify(user)}`);
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
      return this.prisma.user.findMany({
        take: parseInt(limit),
      });
    } else {
      return this.prisma.user.findMany();
    }
  }
  async findOne(id: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: id } });
  }
  async update(id: string, data: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id: id },
      data: {
        name: data.name,
        email: data.email,
      },
    });
  }
  async delete(id: string): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
