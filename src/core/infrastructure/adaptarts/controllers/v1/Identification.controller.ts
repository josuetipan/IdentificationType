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
import { CheckDatabaseConnectionGuard } from 'src/core/application/decorators/check-database.decorator';
import { IdenditicatioService } from 'src/core/application/services/identification.service';
import { Identification} from 'src/core/domain/identification.entity';
import { apiStatus } from 'src/utils/api/apiStatus';

@ApiTags('/msa/users')
@Controller('/msa')
@UseGuards(CheckDatabaseConnectionGuard)
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
  

  @Get('/retrieveidentificationtypes/1.0')
  async getAllIdentificationType(@Req() req): Promise<Identification[]> {
    console.log(req.status);
    return this.identificationTypeService.findAll(req.status);
  }
}
