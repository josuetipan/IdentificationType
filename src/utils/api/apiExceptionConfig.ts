// apiExceptionConfig.ts

// Nombre base de la entidad, se puede cambiar según la entidad en uso
export const apiBaseEntityName: string = 'Users'; // Cambia esto según sea necesario

export const apiExceptionConfig = {
  notFound: {
    type: 'Not Found',
    httpcode: 404,
    message: `${apiBaseEntityName} not found`,
    example: {
      httpcode: 404,
      type: 'Not Found',
      message: `${apiBaseEntityName} not found`,
    },
    routes: [
      { method: 'DELETE', path: '/msa/identificationtypes/1.0' },
      { method: 'PUT', path: '/msa/identificationtypes/1.0' },
      // Agrega más rutas aquí
    ],
  },
  badRequest: {
    type: 'Bad Request',
    httpcode: 400,
    message: 'Bad request due to invalid syntax or parameters',
    example: {
      httpcode: 400,
      type: 'Bad Request',
      message: 'Invalid parameters were provided',
    },
  },
  methodNotAllowed: {
    type: 'Method Not Allowed',
    httpcode: 405,
    message: 'Method Not Allowed',
    example: {
      httpcode: 405,
      type: 'Method Not Allowed',
      message: 'The method is not allowed for this endpoint',
    },
  },
  unauthorized: {
    type: 'Unauthorized',
    httpcode: 401,
    message: 'Authentication is required and has failed or not been provided',
    example: {
      httpcode: 401,
      type: 'Unauthorized',
      message: 'Authentication failed or not provided',
    },
  },
  forbidden: {
    type: 'Forbidden',
    httpcode: 403,
    message: 'Access to the resource is forbidden',
    example: {
      httpcode: 403,
      type: 'Forbidden',
      message: 'You do not have permission to access this resource',
    },
  },
  conflict: {
    type: 'Conflicting',
    httpcode: 409,
    message: 'A conflict occurred due to duplicate data or conflicting state',
    example: {
      httpcode: 409,
      type: 'Conflicting',
      message: 'Duplicate or conflicting data found',
    },
  },
  internalServerError: {
    type: 'Internal Server Error',
    httpcode: 500,
    message: 'Internal server error occurred while processing the request',
    example: {
      httpcode: 500,
      type: 'Internal Server Error',
      message: 'An unexpected error occurred on the server',
    },
  },
  serviceUnavailable: {
    type: 'Unavailable',
    httpcode: 503,
    message: 'Service is currently unavailable',
    example: {
      httpcode: 503,
      type: 'Unavailable',
      message: 'The service is temporarily unavailable, please try again later',
    },
  },
  validation: {
    routes: {
      put: {
        path: '/msa/identificationtypes/1.0',
        requiredParams: ['id'],
      },
      delete: {
        path: '/msa/identificationtypes/1.0',
        requiredParams: ['id'],
      },
      // Agrega más métodos y rutas para validaciones aquí
    },
  },
  // Sección para agregar más configuraciones según sea necesario
};
