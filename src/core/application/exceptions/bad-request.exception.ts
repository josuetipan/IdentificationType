import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Response } from 'express';
import { LoggerService } from '../loggger/logger.service';
import { apiExceptionConfig } from 'src/utils/api/apiExceptionConfig'; // Asegúrate de que la ruta sea correcta

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();
    const validationErrors = exceptionResponse.message;

    let groupedErrors: Record<string, string[]> = {};

    if (Array.isArray(validationErrors)) {
      groupedErrors = validationErrors.reduce(
        (acc: Record<string, string[]>, error: ValidationError | string) => {
          if (typeof error === 'string') {
            acc.general = acc.general || [];
            acc.general.push(error);
          } else {
            const field = error.property;
            const messages = Object.values(error.constraints);
            acc[field] = acc[field] || [];
            acc[field].push(...messages);
          }
          return acc;
        },
        {},
      );
    } else if (typeof validationErrors === 'string') {
      groupedErrors.general = [validationErrors];
    }

    const errorLogs = JSON.stringify({
      statusCode: status,
      typeError: apiExceptionConfig.badRequest.type,
      errors: groupedErrors,
    });
    this.logger.error(errorLogs);

    // Responder al cliente siguiendo el nuevo formato
    response.status(status).json({
      type: apiExceptionConfig.badRequest.type, // Tipo de error configurable
      httpcode: apiExceptionConfig.badRequest.httpcode, // Código HTTP configurable
      message: apiExceptionConfig.badRequest.message, // Mensaje configurable
      errors: groupedErrors, // Errores agrupados
    });
  }
}
