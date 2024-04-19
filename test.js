import { test, describe} from 'node:test';
import { equal, deepEqual } from 'node:assert';
import { build, options } from './app.js';
import { request } from 'node:http';

const jwtValue = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWF0aGV1cyIsInBhc3N3b3JkIjoiQWJjZEAxMjM0IiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzEzNTQ4ODA0fQ.83nRyKJUmL9bSGo3FhPOByRdZBdXraUqBo94TpNmL7c'

const CreateProductTest = {
    name: 'TestProduct10',
    qtd: '15',
    cat_id: '6616ca6fc0c1625999b9ef7f'
}

const UpdateProductTest = {
    name: 'TestProduct700',
    qtd: '10',
    cat_id: '6622ae72a178b9ca04a3ce01'
}

const CreateCategorieTest = {
    name: 'TestCategorie',
    img_url: 'https://www.modernenglishteacher.com/media/26176/rsz_testing_2.jpg'
}

const UpdateCategorieTest = {
    name: 'Testedcategorie',
    img_url: 'https://www.effiliation.com/wp-content/uploads/2018/10/test.png'
    
}

const CreateUserTest = {
    name: 'TestUser67',
    password: 'ABCDe1234567',
    isAdmin: false
}

const AlreadyExists = {
    name: 'TestProduct',
    qtd: 10,
    cat_id: '6622ae72a178b9ca04a3ce01'
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
                url: '/products/6622aecba178b9ca04a3ce07'
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
                url: '/categories/6622ae72a178b9ca04a3ce01'
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
                url: '/categories/6622ae72a178b9ca04a3ce01/products'
            });
            equal(response.statusCode, 200);
        });

        test('# POST /auth', async(t) => {
            const app = await build(options);

            t.after(async() => {
            await app.close();
            });

            const response = await app.inject({
                method: 'POST',
                url: '/auth',
                body: CreateUserTest
            });
            equal(response.statusCode, 200);
        });
   });
    describe('##Bad Request', async(t) => {
        test('# no token', async(t) => {
            const app = await build(options);
    
            t.after(async() => {
                await app.close();
            });

            const response = await app.inject({
                method: 'PUT',
                url: '/categories/6622ae72a178b9ca04a3ce01',
                body: UpdateCategorieTest,
                headers: {
                    
                }
            });
            equal(response.statusCode, 401);
        });
        
        test('# invalid token', async(t) => {
            const app = await build(options);
    
            t.after(async() => {
                await app.close();
            });

            let originalString = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWF0aGV1cyIsImlhdCI6MTcxMjY5Nzc4MX0.tb86bidxFw0aVwDm6l7RdXFB7RqxVrCf3bCosif0Fkg";
            let newString = originalString.replace("e", "");

            const response = await app.inject({
                method: 'PUT',
                url: '/categories/6622ae72a178b9ca04a3ce01',
                body: UpdateCategorieTest,
                headers: {
                    'x-access-token': newString
                }
            });
            equal(response.statusCode, 401);
        });
        
        test('# Not found', async(t) => {
            const app = await build(options);
    
            t.after(async() => {
                await app.close();
            });

            const response = await app.inject({
                method: 'GET',
                url: '/notfound'
            });
            equal(response.statusCode, 404);
        });

        test('# Already exists', async(t) => {
            const app = await build(options);

            t.after(async() => {
            await app.close();
            });

            const response = await app.inject({
                method: 'POST',
                url: '/products',
                body: AlreadyExists,
                headers: {
                    'x-access-token': jwtValue
                }
            });
            equal(response.statusCode, 412);
        });

        test('# Not Implemented', async(t) => {
            const app = await build(options);
    
            t.after(async() => {
                await app.close();
            });

            const response = await app.inject({
                method: 'GET',
                url: '/error'
            });
            equal(response.statusCode, 501);
        });

        test('# isAdmin', async(t) => {
            const app = await build(options);

            t.after(async() => {
            await app.close();
            });

            const response = await app.inject({
                method: 'POST',
                url: '/categories',
                body: CreateCategorieTest,
                headers: {
                    'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdFVzZXIiLCJwYXNzd29yZCI6IjEyMzQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzEzNTQ5MTI3fQ.jD-gmov7oAjjxJINCT7whVhMlZ2M9-8L2vXWgskSaW8'
                }
            });
            equal(response.statusCode, 401);
        });
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
                url: '/categories/6622ae72a178b9ca04a3ce01',
                body: UpdateCategorieTest,
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
                url: '/categories/6622b16b94acc0be32b0420c',
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
                url: '/products/6622aecba178b9ca04a3ce07',
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
                url: '/products/6622b1d03db45ba3878133bd',
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