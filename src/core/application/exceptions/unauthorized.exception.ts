import { ExceptionFilter, Catch, UnauthorizedException, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { LoggerService } from '../loggger/logger.service';
import { apiExceptionConfig } from 'src/utils/api/apiExceptionConfig';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const errorLogs = {
      type: apiExceptionConfig.unauthorized.type,
      httpcode: status,
      message: apiExceptionConfig.unauthorized.message,
    };
    this.logger.error(JSON.stringify(errorLogs));

    response.status(status).json(errorLogs);
  }
}
