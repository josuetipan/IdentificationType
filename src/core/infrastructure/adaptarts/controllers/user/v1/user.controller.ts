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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/core/application/dto/create-user.dto';
import { UpdateUserDto } from 'src/core/application/dto/update-user.dto';
import { UserService } from 'src/core/application/services/identification.service';
import { Identification} from 'src/core/domain/identification.entity';
import { apiStatus } from 'src/utils/api/apiStatus';
import { UUIDValidator } from 'src/utils/api/apiUuidValidator';

@ApiTags('/msa/users')
@Controller('/msa')
export class UserController {
  constructor(private userService: UserService) {}
  @ApiResponse({
    status: apiStatus.badRequest.httpcode,
    example: apiStatus.badRequest.example,
    description: apiStatus.badRequest.message
  })

  @ApiResponse({
    
  })

  @Get('/retrieveidentificationtypes/1.0')
  async getAllUsers(): Promise<Identification[]> {
    return this.userService.findAll();
  }

  

  // Capture unsupported methods for specific routes !Not deleted
}
