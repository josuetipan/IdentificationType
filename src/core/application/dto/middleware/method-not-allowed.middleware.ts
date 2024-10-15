import { Injectable, NestMiddleware, HttpException, HttpStatus, MethodNotAllowedException } from '@nestjs/common';

@Injectable()
export class MethodNotAllowedMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE']; // Métodos permitidos
    if (!allowedMethods.includes(req.method)) {
      
      throw new MethodNotAllowedException('Method Not Allowed for: ' + req.method);
    }
    next();
  }
}
