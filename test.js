import { test, describe} from 'node:test';
import { equal, deepEqual } from 'node:assert';
import { build, options } from './app.js';

const jwtValue = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWF0aGV1cyIsImlhdCI6MTcxMjY5Nzc4MX0.tb86bidxFw0aVwDm6l7RdXFB7RqxVrCf3bCosif0Fkg'

const CreateProductTest = {
    name: 'TestProduct7',
    qtd: '10',
    cat_id: '6616ca6fc0c1625999b9ef7f'
}

const CreateCategorieTest = {
    name: 'TestCategorie',
    img_url: 'https://www.modernenglishteacher.com/media/26176/rsz_testing_2.jpg'
}

const CreateUserTest = {
    name: 'TestUser5',
    password: 'ABCDe123456'
}

const UpdateProductTest = {
    name: 'TestProduct',
    qtd: '1',
    cat_id: '6616ca6fc0c1625999b9ef7f'
}

const UpdateCategorieTest = {
    name: 'Testedcategorie',
    img_url: 'https://www.effiliation.com/wp-content/uploads/2018/10/test.png'
    
}

describe('### Tests for server config', async(t) => {
    test('Testing options configuration file', async (t) => {
        const app = await build(options);
    
        t.after(async() => {
            await app.close();
        });
    
        deepEqual(options.stage, 'test');
        deepEqual(options.port, '3000');
        deepEqual(options.host, '127.0.0.1');
        deepEqual(options.jwt_secret, 'Abcd@1234');
        deepEqual(options.db_url, 'mongodb://localhost:27017/teste');
    
    });
});

describe('### Tests for unauthenticated routes', async(t) => {
   describe('##Success Request', async(t) => {
        test('# GET /products', async(t) => {
            const app = await build(options);
    
            t.after(async() => {
                await app.close();
            });

            const response = await app.inject({
                method: 'GET',
                url: '/products'
            });
            equal(response.statusCode, 200);
        });

        test('# GET /products/:id', async(t) => {
            const app = await build(options);
    
            t.after(async() => {
                await app.close();
            });

            const response = await app.inject({
                method: 'GET',
                url: '/products/6616ca5a7c88395ea9a658aa'
            });
            equal(response.statusCode, 200);
        });

        test('# GET /categories', async(t) => {
            const app = await build(options);
    
            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/categories'
            });
            equal(response.statusCode, 200);
        });

        test('# GET /categories/:id', async(t) => {
            const app = await build(options);
    
            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/categories/6616c923616ab9efb0a94e97'
            });
            equal(response.statusCode, 200);
        });

        test('# GET /categories/:id/products', async(t) => {
            const app = await build(options);
    
            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/categories/:id/products'
            });
            equal(response.statusCode, 200);
        });
   });
    describe('##Bad Request', async(t) => {
    
    })
});

describe('### Tests for authenticated routes', async(t) => {
    describe('##Success Request', async(t) => {
        test('# POST /categories', async(t) => {
            const app = await build(options);

            t.after(async() => {
            await app.close();
            });

            const response = await app.inject({
                method: 'POST',
                url: '/categories',
                body: CreateCategorieTest,
                headers: {
                    'x-access-token': jwtValue
                }
            });
            equal(response.statusCode, 201);
        });

        test('# PUT /categories', async(t) => {
            const app = await build(options);

            t.after(async() => {
            await app.close();
            });

            const response = await app.inject({
                method: 'PUT',
                url: '/categories/6616caa44a3a76dedb561313',
                body: CreateCategorieTest,
                headers: {
                    'x-access-token': jwtValue
                }
            });
            equal(response.statusCode, 204);
        });

        test('# DELETE /categories', async(t) => {
            const app = await build(options);

            t.after(async() => {
            await app.close();
            });

            const response = await app.inject({
                method: 'DELETE',
                url: '/categories/6616d37e4a3b5e53b573b352',
                headers: {
                    'x-access-token': jwtValue
                }
            });
            equal(response.statusCode, 204);
        });

        test('# POST /products', async(t) => {
            const app = await build(options);

            t.after(async() => {
            await app.close();
            });

            const response = await app.inject({
                method: 'POST',
                url: '/products',
                body: CreateProductTest,
                headers: {
                    'x-access-token': jwtValue
                }

            });
            equal(response.statusCode, 201);
        });

        test('# PUT /products', async(t) => {
            const app = await build(options);

            t.after(async() => {
            await app.close();
            });

            const response = await app.inject({
                method: 'PUT',
                url: '/products/6616cd1fa96473170b2db9db',
                body: UpdateProductTest,
                headers: {
                    'x-access-token': jwtValue
                }

            });
            equal(response.statusCode, 204);
        });

        test('# DELETE /products', async(t) => {
            const app = await build(options);

            t.after(async() => {
            await app.close();
            });

            const response = await app.inject({
                method: 'DELETE',
                url: '/products/6616d37e4a3b5e53b573b353',
                headers: {
                    'x-access-token': jwtValue
                }

            });
            equal(response.statusCode, 204);
        });

        test('# POST /register', async(t) => {
            const app = await build(options);

            t.after(async() => {
            await app.close();
            });

            const response = await app.inject({
                method: 'POST',
                url: '/register',
                body: CreateUserTest,
                headers: {
                    'x-access-token': jwtValue
                }

            });
            equal(response.statusCode, 201);
        });

    })
});