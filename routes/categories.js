/** @type{import('fastify').FastifyPluginAsync<>} */
import createError from '@fastify/error';
export default async function products(app, options) {
    const InvalidProductError = createError('InvalidProductError', 'Produto Inválido.', 400);

    const categories = app.mongo.db.collection('categorias');

    app.get('/categories', 
        {
            config: {
                logMe: true
            }
        }, 
        async (req, rep) => {
        return await categories.find().toArray();
    });

    app.post('/categories', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    img_url: {type: 'string'}
                },
                required: ['name', 'img_url']
            }
        },
        config: {
            requireAuthentication: true
        }
    }, async (req, rep) => {
        let category = req.body;

        await categories.insertOne(category);

        return rep.code(201).send();
    });

    app.delete('/categories/:id', { config: {
        requireAuthentication: true
    }}, async (req, rep) => {
        let id = req.params.id;
        let categories = await categories.deleteOne({_id: new app.mongo.ObjectId(id)});
        
        return rep.code(204).send();
    });

    app.put('/categories/:id', { config: {
        requireAuthentication: true
        }
        },async (req, rep) => {
        let id = req.params.id;
        let category = req.body;
        await categories.updateOne({_id: new app.mongo.ObjectId(id)}, {
            $set: {
                name: category.name,
                img_url: category.img_url
            }
        });
        
        return rep.code(204).send();
    });
}