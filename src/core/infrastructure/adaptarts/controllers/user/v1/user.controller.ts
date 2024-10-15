import {
  All,
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  MethodNotAllowedException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/core/application/dto/create-user.dto';
import { SendData } from 'src/core/application/dto/sendData-user.dto';
import { UpdateUserDto } from 'src/core/application/dto/update-user.dto';
import { UserService } from 'src/core/application/users/user.service';
import { User } from 'src/core/domain/user.entity';
import { UUIDValidator } from 'src/utils/api/apiUuidValidator';

@ApiTags('/msa/users')
@Controller('/msa/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('1.0')
  @HttpCode(201)
  async createUser(@Body() data: CreateUserDto): Promise<object> {
    return this.userService.create(data);
  }

  @Get('1.0')
  async getAllUsers(@Query() params): Promise<SendData | User[]> {
    const { limit, page } = params;
    return this.userService.findAll(limit, page);
  }

  @Get('1.0/:id')
  async getOneUser(@Param('id') id: string): Promise<User> {
    if (!UUIDValidator.isValidUUID(id)) {
      throw new BadRequestException('The "id" parameter must be a valid UUID.');
    }
    return this.userService.findOne(id);
  }

  @Put('1.0/:id')
  async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<User> {
    if (!UUIDValidator.isValidUUID(id)) {
      throw new BadRequestException('The "id" parameter must be a valid UUID.');
    }
    return this.userService.update(id, data);
  }

  @Delete('1.0/:id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    if (!UUIDValidator.isValidUUID(id)) {
      throw new BadRequestException('The "id" parameter must be a valid UUID.');
    }
    return this.userService.delete(id);
  }

  // Capture unsupported methods for specific routes !Not deleted
  @All('1.0')
  @HttpCode(405)
  handleMethodNotAllowedGeneral() {
    throw new MethodNotAllowedException(
      'Method not allowed on this route. Allowed methods: POST, GET.'
    );
  }
}
