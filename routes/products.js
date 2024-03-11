/** @type{import('fastify').FastifyPluginAsync<>} */
import createError from '@fastify/error';
export default async function products(app, options) {
    const InvalidProductError = createError('InvalidProductError', 'Produto Inválido.', 400);

    const products = app.mongo.db.collection('products');

    app.get('/products', 
        {
            config: {
                logMe: true,
                requireAuthentication: true
            }
        }, 
        async (req, rep) => {
        return products.find();
    });

    app.post('/products', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    qtd: { type: 'integer' }
                },
                required: ['name', 'qtd']
            }
        }
    }, async (req, rep) => {
        let product = req.body;
        req.log.info(`Including product ${product.name}.`);
        return product;
    });

    app.get('/products/:id', async (req, rep) => {
        app.log.info('Produto requisitado> ' + req.params.id);
        return {};
    });
    
    app.delete('/products/:id', async (req, rep) => {
        app.log.info('Produto para remover> ' + req.params.id);
        return {};
    });
}