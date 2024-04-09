/** @type{import('fastify').FastifyPluginAsync<>} */
import createError from '@fastify/error';
export default async function user(app, options) {
    const InvalidUserError = createError('InvalidUserError', 'Usuário Inválido.', 400);

    const users = app.mongo.db.collection('users');
    
    app.post('/users', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    password: {type: 'string'}
                },
                required: ['name', 'password']
            }
        },
        config: {
            requireAuthentication: true
        }
    }, async (req, rep) => {
        let user = req.body;

        await users.insertOne(user);

        return rep.code(201).send();
    });
}