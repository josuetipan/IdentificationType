import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { LoggerService } from '../loggger/logger.service';
import { apiExceptionConfig } from 'src/utils/api/apiExceptionConfig';
import { ValidationError } from 'class-validator';
import { apiMethodsName } from 'src/utils/api/apiMethodsName';

@Catch(HttpException)
export class MethodNotAllowedFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    let groupedErrors: Record<string, string[]> = {};
    const exceptionResponse: any = exception.getResponse();
    const validationErrors = exceptionResponse.message;
    console.log(validationErrors);

    // Agrupar errores de validación
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

    if (status === 405 || status === 409) {
      const customMessage =
        exception.message || apiExceptionConfig.methodNotAllowed.message; // Mensaje personalizado
      const httpMethod = request.method; // Obtener el método HTTP
      const serviceName =
        apiMethodsName[httpMethod.toLowerCase() as keyof typeof apiMethodsName]; // Obtener el nombre del servicio
      const errorLogs = {
        code: exception.name, // Código del error configurable
        message: customMessage, // Mensaje personalizado
        timestamp: new Date().toISOString(), // Timestamp actual
        service: serviceName, // Incluir el nombre del servicio
      };

      // Log de error
      this.logger.error(JSON.stringify(errorLogs));

      // Responder al cliente con la estructura nueva
      response.status(status).json(errorLogs);
    } else {
      // Manejo para otros tipos de excepciones
      const errorLogs = {
        code: apiExceptionConfig.methodNotAllowed.code, // Puedes ajustar esto según tu configuración
        message: exception.message,
        timestamp: new Date().toISOString(),
        service:
          apiMethodsName[
            request.method.toLowerCase() as keyof typeof apiMethodsName
          ],
        errors: groupedErrors, // Incluyendo errores agrupados en el log
      };

      this.logger.error(JSON.stringify(errorLogs));

      response.status(status).json(errorLogs);
    }
  }
}
