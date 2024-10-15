import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Response } from 'express';
import { LoggerService } from '../loggger/logger.service';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    const validationErrors = exceptionResponse.message;

    // Verificar si validationErrors es un arreglo
    let groupedErrors: Record<string, string[]> = {};

    if (Array.isArray(validationErrors)) {
      // Agrupar los errores por propiedad si validationErrors es un array
      groupedErrors = validationErrors.reduce(
        (acc: Record<string, string[]>, error: ValidationError | string) => {
          if (typeof error === 'string') {
            // Para errores que no son de class-validator, los agrupamos en "general"
            acc.general = acc.general || [];
            acc.general.push(error);
          } else {
            // Agrupamos los errores por la propiedad
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
      // Si validationErrors es un string, lo agrupamos en "general"
      groupedErrors.general = [validationErrors];
    }

    const errorLogs = JSON.stringify({
      statusCode: status,
      typeError: exceptionResponse.error,
      errors: groupedErrors,
    });
    this.logger.error(errorLogs);

    response.status(status).json({
      statusCode: status,
      typeError: exceptionResponse.error,
      errors: groupedErrors,
    });
  }
}
