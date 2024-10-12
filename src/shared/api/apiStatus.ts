export const apiEntityName: string = 'User';

export const apiStatus = {
  ok: {
    type: 'Success',
    httpcode: 200,
    message: 'Indicates that the service ran successfully',
    example: {
      httpcode: 200,
      type: 'Success',
      message: 'Indicates that the service ran successfully',
    },
  },
  create: {
    type: 'Created',
    httpcode: 201,
    message: `Indicates that the service created ${apiEntityName} successfully`,
    example: {
      type: 'Created',
      httpcode: 201,
      message: `${apiEntityName} created successfully`,
    },
  },
  noContent: {
    type: 'No Content',
    httpcode: 204,
    message:
      'Indicates that the request was successful but there is no content to return',
    example: {
      httpcode: 204,
      type: 'No Content',
      message: 'No content available',
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
  conflict: {
    type: 'Error',
    httpcode: 409,
    message: 'A conflict occurred due to duplicate data or conflicting state',
    example: {
      httpcode: 409,
      type: 'Error',
      message: 'Duplicate or conflicting data found',
    },
  },
  businessError: {
    type: 'Business Error',
    httpcode: 498,
    message: 'Error of business',
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
