import { ExceptionFilter, Catch, ForbiddenException, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { LoggerService } from '../loggger/logger.service';
import { apiExceptionConfig } from 'src/utils/api/apiExceptionConfig';

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: ForbiddenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const errorLogs = {
      type: apiExceptionConfig.forbidden.type,
      httpcode: status,
      message: apiExceptionConfig.forbidden.message,
    };
    this.logger.error(JSON.stringify(errorLogs));

    response.status(status).json(errorLogs);
  }
}
