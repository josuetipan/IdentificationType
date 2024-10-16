import { apiBaseEntityName } from './apiBaseEntity';
import { apiMethodsName } from './apiMethodsName';

export const apiStatus = {
  ok: {
    status: 200,
    description: 'Successful retrieval of identification types',
    schema: {
      type: 'object',
      properties: {
        identificationTypes: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'Unique code for the identification type',
              },
              name: {
                type: 'string',
                description: 'Name of the identification type',
              },
            },
          },
        },
      },
    },
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            identificationTypes: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    description: 'Unique code for the identification type',
                  },
                  name: {
                    type: 'string',
                    description: 'Name of the identification type',
                  },
                },
              },
            },
          },
        },
        example: {
          identificationTypes: [
            {
              id: 'ID_CARD',
              name: 'ID Card',
            },
            {
              id: 'PASSPORT',
              name: 'Passport',
            },
          ],
        },
      },
    },
  },
  badRequest: {
    status: 400,
    description: 'Bad Request',
    schema: {
      $ref: '#/components/schemas/Error',
    },
    content: {
      'application/json': {
        example: {
          code: 'Bad Request',
          message: 'Invalid parameters were provided',
          timestamp: new Date().toISOString(),
          service: apiMethodsName.post, // Ajuste de servicio de acuerdo con el método
        },
      },
    },
    example: {
      code: 'Bad Request',
      message: 'Invalid parameters were provided',
      timestamp: new Date().toISOString(),
      service: apiMethodsName.post, // Ajuste de servicio de acuerdo con el método
    },
  },
  unauthorized: {
    status: 401,
    description: 'Authentication required',
    schema: {
      $ref: '#/components/schemas/Error',
    },
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Error',
        },
        example: {
          code: 'Unauthorized',
          message: 'Authentication failed or not provided',
          timestamp: new Date().toISOString(),
          service: apiMethodsName.get, // Ajuste de servicio según el método
        },
      },
    },
    example: {
      code: 'Unauthorized',
      message: 'Authentication failed or not provided',
      timestamp: new Date().toISOString(),
      service: apiMethodsName.get,
    },
  },
  forbidden: {
    status: 403,
    description: 'Access forbidden',
    schema: {
      $ref: '#/components/schemas/Error',
    },
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Error',
        },
        example: {
          code: 'Forbidden',
          message: 'You do not have permission to access this resource',
          timestamp: new Date().toISOString(),
          service: apiMethodsName.get,
        },
      },
    },
    example: {
      code: 'Forbidden',
      message: 'You do not have permission to access this resource',
      timestamp: new Date().toISOString(),
      service: apiMethodsName.get,
    },
  },
  notFound: {
    status: 404,
    description: `${apiBaseEntityName} not found`,
    schema: {
      $ref: '#/components/schemas/Error',
    },
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Error',
        },
        example: {
          code: 'Not Found',
          message: `${apiBaseEntityName} not found`,
          timestamp: new Date().toISOString(),
          service: apiMethodsName.get,
        },
      },
    },
    example: {
      code: 'Not Found',
      message: `${apiBaseEntityName} not found`,
      timestamp: new Date().toISOString(),
      service: apiMethodsName.get,
    },
  },
  methodNotAllowed: {
    status: 405,
    description: 'Method not allowed',
    schema: {
      $ref: '#/components/schemas/Error',
    },
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Error',
        },
        example: {
          code: 'Method Not Allowed',
          message: 'The method is not allowed for this endpoint',
          timestamp: new Date().toISOString(),
          service: apiMethodsName.post, // Ajuste del método
        },
      },
    },
    example: {
      code: 'Method Not Allowed',
      message: 'The method is not allowed for this endpoint',
      timestamp: new Date().toISOString(),
      service: apiMethodsName.post,
    },
  },
  requestTimeout: {
    status: 408,
    description: 'Request timeout',
    schema: {
      $ref: '#/components/schemas/Error',
    },
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Error',
        },
        example: {
          code: 'Request Timeout',
          message: 'The request took too long to complete',
          timestamp: new Date().toISOString(),
          service: apiMethodsName.get,
        },
      },
    },
    example: {
      code: 'Request Timeout',
      message: 'The request took too long to complete',
      timestamp: new Date().toISOString(),
      service: apiMethodsName.get,
    },
  },
  conflict: {
    status: 409,
    description: 'Conflict in the request',
    schema: {
      $ref: '#/components/schemas/Error',
    },
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Error',
        },
        example: {
          code: 'Conflict',
          message: 'Business rule conflict occurred',
          timestamp: new Date().toISOString(),
          service: apiMethodsName.post,
        },
      },
    },
    example: {
      code: 'Conflict',
      message: 'Business rule conflict occurred',
      timestamp: new Date().toISOString(),
      service: apiMethodsName.put,
    },
  },
  internalServerError: {
    status: 500,
    description: 'Internal server error occurred while processing the request',
    schema: {
      $ref: '#/components/schemas/Error',
    },
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Error',
        },
        example: {
          code: 'Internal Server Error',
          message: 'An unexpected error occurred on the server',
          timestamp: new Date().toISOString(),
          service: apiMethodsName.get,
        },
      },
    },
    example: {
      code: 'Internal Server Error',
      message: 'An unexpected error occurred on the server',
      timestamp: new Date().toISOString(),
      service: apiMethodsName.get,
    },
  },
  serviceUnavailable: {
    status: 503,
    description: 'Service temporarily unavailable',
    schema: {
      $ref: '#/components/schemas/Error',
    },
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Error',
        },
        example: {
          code: 'Service Unavailable',
          message: 'The service is temporarily unavailable, please try again later',
          timestamp: new Date().toISOString(),
          service: apiMethodsName.get,
        },
      },
    },
    example: {
      code: 'Service Unavailable',
      message: 'The service is temporarily unavailable, please try again later',
      timestamp: new Date().toISOString(),
      service: apiMethodsName.get,
    },
  },
};
