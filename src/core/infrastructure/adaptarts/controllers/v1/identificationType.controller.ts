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
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'auth-guard-michimoney';
import { CheckDatabaseConnectionGuard } from 'src/core/application/decorators/check-database.decorator';
import { IdentificationResponse } from 'src/core/application/dtos/identification.dto';
import { IdenditicatioService } from 'src/core/application/services/identification.service';
import { Identification} from 'src/core/domain/identificationType.entity';
import { apiStatus } from 'src/utils/api/apiStatus';

@Controller(
  {
    version: 'v1.0'
  }
)
//@UseGuards(CheckDatabaseConnectionGuard)
export class IdentificationTypeController {
  constructor(private identificationTypeService: IdenditicatioService) {}

  @ApiResponse(apiStatus.ok)
  @ApiResponse(apiStatus.badRequest)
  @ApiResponse(apiStatus.unauthorized)
  @ApiResponse(apiStatus.forbidden)
  @ApiResponse(apiStatus.methodNotserviceowed)//405
  @ApiResponse(apiStatus.requestTimeout)
  @ApiResponse(apiStatus.internalServerError)
  @ApiResponse(apiStatus.serviceUnavailable)
  @ApiResponse(apiStatus.conflict)
  @ApiResponse(apiStatus.notFound)
  
  //@UseGuards(AuthGuard)
  @Get('/retrieveidentificationtypes')
  async getAllIdentificationType(@Req() req): Promise<IdentificationResponse[]> {
    return this.identificationTypeService.findAll(req.status);
  }
}
