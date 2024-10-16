import { ExceptionFilter, Catch, ForbiddenException, ArgumentsHost } from '@nestjs/common';
import { Response, Request } from 'express';
import { LoggerService } from '../loggger/logger.service';
import { apiExceptionConfig } from 'src/utils/api/apiExceptionConfig'; // Asegúrate de que la ruta sea correcta
import { apiMethodsName } from 'src/utils/api/apiMethodsName';

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: ForbiddenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const customMessage = exception.message || apiExceptionConfig.forbidden.message; // Mensaje personalizado
    const httpMethod = request.method; // Obtener el método HTTP
    const serviceName = apiMethodsName[httpMethod.toLowerCase() as keyof typeof apiMethodsName]; // Obtener el nombre del servicio

    // Estructura del log de error
    const errorLogs = {
      code: apiExceptionConfig.forbidden.code, // Código del error configurable
      message: customMessage, // Mensaje personalizado
      timestamp: new Date().toISOString(), // Timestamp actual
      service: serviceName, // Incluir el nombre del servicio
    };

    // Log de error
    this.logger.error(JSON.stringify(errorLogs));

    // Responder al cliente con la estructura nueva
    response.status(status).json(errorLogs);
  }
}
