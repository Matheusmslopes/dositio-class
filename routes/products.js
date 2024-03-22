/** @type{import('fastify').FastifyPluginAsync<>} */
import createError from '@fastify/error';
export default async function products(app, options) {
    const InvalidProductError = createError('InvalidProductError', 'Produto Inválido.', 400);

    const products = app.mongo.db.collection('products');

    app.get('/products', 
        {
            config: {
                logMe: true
            }
        }, 
        async (req, rep) => {
        return await products.find().toArray();
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
        },
        config: {
            requireAuthentication: true
        }
    }, async (req, rep) => {
        let product = req.body;

        await products.insertOne(product);

        return rep.code(201).send();
    });

    app.get('/products/:id', async (req, rep) => {
        let id = req.params.id;
        let product = await products.findOne({_id: new app.mongo.ObjectId(id)});
        
        return product;
    });
    
    app.delete('/products/:id', { config: {
        requireAuthentication: true
    }}, async (req, rep) => {
        let id = req.params.id;
        let product = await products.deleteOne({_id: new app.mongo.ObjectId(id)});
        
        return rep.code(204).send();
    });

    app.put('/products/:id', { config: {
        requireAuthentication: true
        }
        },async (req, rep) => {
        let id = req.params.id;
        let product = req.body;
        await products.updateOne({_id: new app.mongo.ObjectId(id)}, {
            $set: {
                name: product.name,
                qtd: product.qtd
            }
        });
        
        return rep.code(204).send();
    });
}