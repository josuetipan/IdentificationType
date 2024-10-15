import { ExceptionFilter, Catch, HttpException, ArgumentsHost } from '@nestjs/common';
import { Response, Request } from 'express';
import { LoggerService } from '../loggger/logger.service';
import { apiExceptionConfig } from 'src/utils/api/apiExceptionConfig';

@Catch(HttpException) 
export class MethodNotAllowedFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (status === 405) {
      const customMessage = exception.message || apiExceptionConfig.methodNotAllowed.message;

      const errorLogs = {
        type: 'Method Not Allowed',
        httpcode: status,
        message: customMessage,
      };
      this.logger.error(JSON.stringify(errorLogs));
      
      response.status(status).json(errorLogs);
    } else {
      // Manejo para otros tipos de excepciones
      response.status(status).json({
        type: 'Method Not Allowed',
        statusCode: status,
        message: exception.message,
      });
    }
  }
}
