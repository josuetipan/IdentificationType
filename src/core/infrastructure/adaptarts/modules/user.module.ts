import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user/v1/user.controller';
import { UserService } from 'src/core/application/users/user.service';
import { PrismaService } from 'src/core/application/prisma/prisma.service';
import { LoggerService } from 'src/core/application/loggger/logger.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService, LoggerService],
})
export class UserModule {}
