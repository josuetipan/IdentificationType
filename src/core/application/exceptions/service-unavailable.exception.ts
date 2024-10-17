import {
  ExceptionFilter,
  Catch,
  ServiceUnavailableException,
  ArgumentsHost,
} from '@nestjs/common';
import { Response } from 'express';
import { LoggerService } from '../loggger/logger.service';
import { apiExceptionConfig } from 'src/utils/api/userEntity/apiExceptionConfig';
import { apiMethodsName } from 'src/utils/api/userEntity/apiMethodsName';

@Catch(ServiceUnavailableException)
export class ServiceUnavailableExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: ServiceUnavailableException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const customMessage = apiExceptionConfig.serviceUnavailable.message; // Mensaje personalizado
    const serviceName = apiMethodsName['service_unavailable']; // Puedes ajustar este nombre según tu configuración

    const errorLogs = {
      code: apiExceptionConfig.serviceUnavailable.code, // Código del error configurable
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
