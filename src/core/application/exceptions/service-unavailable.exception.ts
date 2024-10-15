import { ExceptionFilter, Catch, ServiceUnavailableException, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { LoggerService } from '../loggger/logger.service';
import { apiExceptionConfig } from 'src/utils/api/apiExceptionConfig';

@Catch(ServiceUnavailableException)
export class ServiceUnavailableExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: ServiceUnavailableException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const errorLogs = {
      type: apiExceptionConfig.serviceUnavailable.type,
      httpcode: status,
      message: apiExceptionConfig.serviceUnavailable.message,
    };
    this.logger.error(JSON.stringify(errorLogs));

    response.status(status).json(errorLogs);
  }
}
