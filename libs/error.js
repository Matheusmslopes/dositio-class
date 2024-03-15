import createError from '@fastify/error';
export const AUTH_NO_TOKEN = createError('AUTH_NO_TOKEN', 'x-access-token is missing', 401);
export const AUTH_INVALID_TOKEN = createError('TAUTH_INVALID_TOKEN', 'The roken provided is invalid', 401);

export const NOT_FOUND = createError('NOT_FOUND', 'The requested resource could not be found, 404');