import { ExceptionFilter, Catch, InternalServerErrorException, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { LoggerService } from '../loggger/logger.service';
import { apiExceptionConfig } from 'src/utils/api/apiExceptionConfig';

@Catch(InternalServerErrorException)
export class InternalServerErrorExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const errorLogs = {
      type: apiExceptionConfig.internalServerError.type,
      httpcode: status,
      message: apiExceptionConfig.internalServerError.message,
    };
    this.logger.error(JSON.stringify(errorLogs));

    response.status(status).json(errorLogs);
  }
}
