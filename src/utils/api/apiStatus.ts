export const apiEntityName: string = 'identificationTypes';

export const apiStatus = {
  ok: {
    type: 'Success',
    httpcode: 200,
    message: 'Successful retrieval of identification types',
    example: {
      httpcode: 200,
      type: 'Success',
      message: 'Successful retrieval of identification types',
    },
  },
  badRequest: {
    type: 'Error',
    httpcode: 400,
    message: 'Bad request due to invalid syntax or parameters',
    example: {
      httpcode: 400,
      type: 'Error',
      message: 'Invalid parameters were provided',
    },
  },
  unauthorized: {
    type: 'Error',
    httpcode: 401,
    message: 'Authentication is required and has failed or not been provided',
    example: {
      httpcode: 401,
      type: 'Error',
      message: 'Authentication failed or not provided',
    },
  },
  forbidden: {
    type: 'Error',
    httpcode: 403,
    message: 'Access to the resource is forbidden',
    example: {
      httpcode: 403,
      type: 'Error',
      message: 'You do not have permission to access this resource',
    },
  },
  notFound: {
    type: 'Error',
    httpcode: 404,
    message: `${apiEntityName} not found`,
    example: {
      httpcode: 404,
      type: 'Error',
      message: `${apiEntityName} not found`,
    },
  },
  methodNotAllowed: {
    type: 'Error',
    httpcode: 405,
    message: 'Method not allowed for this resource',
    example: {
      httpcode: 405,
      type: 'Error',
      message: 'The method is not allowed for this endpoint',
    },
  },
  requestTimeout: {
    type: 'Error',
    httpcode: 408,
    message: 'Request timeout',
    example: {
      httpcode: 408,
      type: 'Error',
      message: 'The request took too long to complete',
    },
  },
  conflict: {
    type: 'Error',
    httpcode: 409,
    message: 'A conflict occurred due to business rule violations',
    example: {
      httpcode: 409,
      type: 'Error',
      message: 'Business rule conflict occurred',
    },
  },
  internalServerError: {
    type: 'Error',
    httpcode: 500,
    message: 'Internal server error occurred while processing the request',
    example: {
      httpcode: 500,
      type: 'Error',
      message: 'An unexpected error occurred on the server',
    },
  },
  serviceUnavailable: {
    type: 'Error',
    httpcode: 503,
    message: 'Service is currently unavailable',
    example: {
      httpcode: 503,
      type: 'Error',
      message: 'The service is temporarily unavailable, please try again later',
    },
  },
};
