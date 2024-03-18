/** @type{import('fastify').FastifyPluginAsync<>} */
import createError from '@fastify/error';
export default async function products(app, options) {
    const InvalidProductError = createError('InvalidProductError', 'Produto Inválido.', 400);

    const categories = app.mongo.db.collection('categorias');

    app.get('/categories', 
        {
            config: {
                logMe: true,
                requireAuthentication: true
            }
        }, 
        async (req, rep) => {
        return await categories.find().toArray();
    });

}