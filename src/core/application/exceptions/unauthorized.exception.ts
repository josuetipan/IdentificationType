import { ExceptionFilter, Catch, UnauthorizedException, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { LoggerService } from '../loggger/logger.service';
import { apiExceptionConfig } from 'src/utils/api/apiExceptionConfig';
import { apiMethodsName } from 'src/utils/api/apiMethodsName';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const customMessage = apiExceptionConfig.unauthorized.message; // Mensaje personalizado
    const serviceName = apiMethodsName['unauthorized']; // Ajusta el nombre según tu configuración

    const errorLogs = {
      code: apiExceptionConfig.unauthorized.code, // Código del error configurable
      message: customMessage, // Mensaje personalizado
      timestamp: new Date().toISOString(), // Timestamp actual
      service: serviceName, // Nombre del servicio
    };

    // Log de error
    this.logger.error(JSON.stringify(errorLogs));

    // Responder al cliente con la estructura nueva
    response.status(status).json(errorLogs);
  }
}
