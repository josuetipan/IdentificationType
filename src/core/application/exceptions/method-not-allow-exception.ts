import { ExceptionFilter, Catch, HttpException, ArgumentsHost } from '@nestjs/common';
import { Response, Request } from 'express';
import { LoggerService } from '../loggger/logger.service';
import { apiExceptionConfig, apiMethodsName } from 'src/utils/api/apiExceptionConfig';

@Catch(HttpException) 
export class MethodNotAllowedFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (status === 405) {
      const customMessage = exception.message || apiExceptionConfig.methodNotAllowed.message; // Mensaje personalizado
      const httpMethod = request.method; // Obtener el método HTTP
      const serviceName = apiMethodsName[httpMethod.toLowerCase() as keyof typeof apiMethodsName]; // Obtener el nombre del servicio

      const errorLogs = {
        code: apiExceptionConfig.methodNotAllowed.code, // Código del error configurable
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
        service: apiMethodsName[request.method.toLowerCase() as keyof typeof apiMethodsName],
      };

      this.logger.error(JSON.stringify(errorLogs));

      response.status(status).json(errorLogs);
    }
  }
}
