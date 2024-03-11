import fastify from 'fastify';
import createError from '@fastify/error';
import autoload from '@fastify/autoload';
import jwt from '@fastify/jwt';
import mongodb from '@fastify/mongodb';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MyCustomError = createError('MyCustomError', 'Something stranged happened.', 501);

export async function build(opts){
    const app = fastify(opts);

    await app.register(jwt, {
        secret: opts.jwt_secret
    });

    await app.register(mongodb, {
        forceClose: true,
        url: 'mongodb://localhost:27017/dositio'
    });

    await app.register(autoload, {
        dir: join(__dirname, 'hooks'),
        encapsulate: false
    });

    await app.register(autoload, {
        dir: join(__dirname, 'routes')
    });


    app.get('/error', (req, rep) => {
        throw new MyCustomError();
    });
 

    app.setErrorHandler(async (error, req, rep) => {
        const  { validation } = error;
        req.log.error({ error });
        rep.code(error.statusCode || 500);

        
        return validation ? `Validation Error: ${validation[0].message}.` : 'Internal Server Error';
    });

    app.get('/notfound', async (req, rep) => {
        req.log.info('Sending to not found handler.');
        rep.callNotFound();
    });

    app.setNotFoundHandler(async (req, rep) => {
        rep.code(404);
        return 'Resource not found.';
    });

    return app;
}