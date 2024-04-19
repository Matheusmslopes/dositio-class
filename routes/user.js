/** @type{import('fastify').FastifyPluginAsync<>} */
import createError from '@fastify/error';
export default async function user(app, options) {
    const InvalidUserError = createError('InvalidUserError', 'Usuário Inválido.', 400);

    const users = app.mongo.db.collection('users');
    
    app.post('/register', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    password: {type: 'string'},
                    isAdmin: {type: 'boolean'}
                },
                required: ['name', 'password', 'isAdmin']
            }
        },
        config: {
            requireAuthentication: true
        }
    }, async (req, rep) => {
        let name = req.body.name;
        let isAdm = req.body.isAdmin;

        let jwtToken = app.jwt.sign(req.body);

        await users.insertOne({name: name, isAdmin: isAdm, jwtToken: jwtToken});

        return rep.code(201).send();
    });
}