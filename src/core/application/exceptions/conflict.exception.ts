import { ExceptionFilter, Catch, ConflictException, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { LoggerService } from '../loggger/logger.service';
import { apiExceptionConfig } from 'src/utils/api/apiExceptionConfig';

@Catch(ConflictException)
export class ConflictExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: ConflictException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    // Tomamos el mensaje personalizado de la excepción
    const customMessage = exception.message || apiExceptionConfig.conflict.message;

    const errorLogs = {
      type: apiExceptionConfig.conflict.type,
      httpcode: status,
      message: customMessage, // Usamos el mensaje personalizado de la excepción
    };

    this.logger.error(JSON.stringify(errorLogs));

    response.status(status).json(errorLogs);
  }
}
