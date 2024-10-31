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
import { LoggerKafkaService } from 'src/core/application/loggger/loggerKafka.service';
import { IdenditicatioService } from 'src/core/application/services/identification.service';
import { Identification} from 'src/core/domain/identificationType.entity';
import { apiBaseEntityName } from 'src/utils/api/apiEntites';
import { apiStatus } from 'src/utils/api/apiStatus';
import { json } from 'stream/consumers';
import { Logger } from 'winston';

@Controller(
  {
    version: 'v1.0'
  }
)
@UseGuards(CheckDatabaseConnectionGuard)
export class IdentificationTypeController {
  constructor(private identificationTypeService: IdenditicatioService,
    private logger: LoggerKafkaService
  ) {}

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
  
  @UseGuards(AuthGuard)
  @Get('/retrieveidentificationtypes')
  async getAllIdentificationType(@Req() req: Request): Promise<IdentificationResponse[]> {
    this.logger.log(
      JSON.stringify('Path:'+ req.url), `/retrieveidentificationtypes`,
      apiBaseEntityName
    );
    const typeResponse = await this.identificationTypeService.findAll(req);
    return typeResponse;
  }
}
