import {
  ExceptionFilter,
  Catch,
  NotFoundException,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '../loggger/logger.service'; // Asegúrate de que la ruta sea correcta
import { apiExceptionConfig, apiBaseEntityName } from 'src/utils/api/apiExceptionConfig';
import { UUIDValidator } from 'src/utils/api/apiUuidValidator';

@Catch(NotFoundException) // Este decorador indica que este filtro manejará excepciones de tipo NotFoundException
export class NotFoundExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {} // Inyección del servicio de logger

  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();
    const httpMethod = request.method;
    let customMessage = exceptionResponse.message;
    if(exception.message.includes('Cannot')) {
      customMessage = `The route '${request.url}' was not found. Please ensure that the URL is correct and that the resource exists. (Entity: ${apiBaseEntityName}, Method: ${httpMethod})`

    }
    // Obtener el mensaje personalizado si existe, o usar un mensaje por defecto
    
    // Lógica para manejar las validaciones de rutas
    const routeConfig = apiExceptionConfig.notFound.routes.find(
      (route) => route.method === httpMethod && request.url.startsWith(route.path) // Cambiado a startsWith
    );

    // Validar que la ID en la URL sea un número entero
    const idParam = request.params['id'];
    if (idParam && !UUIDValidator.isValidUUID(idParam)) {
      response.status(HttpStatus.BAD_REQUEST).json({
        type: 'Bad Request',
        httpcode: HttpStatus.BAD_REQUEST,
        message: `The parameter "id" must be a valid UUID. Provided: "${idParam}"`,
      });
      return;
    }
    
    // Si se encuentra una configuración de ruta
    if (routeConfig) {
      const validationConfig = apiExceptionConfig.validation.routes[httpMethod.toLowerCase()];
      if (validationConfig && validationConfig.path === routeConfig.path) {
        for (const param of validationConfig.requiredParams) {
          if (!request.params[param]) {
            // Si falta un parámetro requerido, devolver un error 400 Bad Request
            response.status(apiExceptionConfig.badRequest.httpcode).json({
              type: apiExceptionConfig.badRequest.type, // Tipo de error
              httpcode: apiExceptionConfig.badRequest.httpcode, // Código HTTP
              message: `The parameter "${param}" is required for this route.`, // Mensaje indicando el parámetro faltante
            });
            return;
          }
        }
      }

      // Respuesta para el caso de Not Found con la ruta encontrada
      response.status(apiExceptionConfig.notFound.httpcode).json({
        type: apiExceptionConfig.notFound.type, // Tipo de error
        httpcode: apiExceptionConfig.notFound.httpcode, // Código HTTP
        message: customMessage, // Mensaje personalizado o por defecto
      });
      return;
    }
    
    // Respuesta para el caso de Not Found genérico cuando no se encuentra la ruta
    response.status(HttpStatus.NOT_FOUND).json({
      type: apiExceptionConfig.notFound.type, // Tipo de error genérico
      httpcode: HttpStatus.NOT_FOUND, // Código HTTP 404
      message: customMessage, // Mensaje genérico con la URL
    });

    // Log de error para registrar detalles sobre la excepción
    const errorLogs = JSON.stringify({
      statusCode: status,
      typeError: exceptionResponse.error,
      message: customMessage, // Log del mensaje personalizado o por defecto
    });
    this.logger.error(errorLogs); // Registro del error utilizando el servicio de logger
  }
}
