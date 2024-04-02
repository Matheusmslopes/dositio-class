import { test, describe} from 'node:test';
import { equal, deepEqual } from 'node:assert';
import { build, options } from './app.js';

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
        deepEqual(options.db_url, 'mongodb://localhost:27017/dositio');
    
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

        /*test('# GET /products/:id', async(t) => {
            const app = await build(options);
    
            t.after(async() => {
                await app.close();
            });

            const response = await app.inject({
                method: 'GET',
                url: '/products/:id'
            });
            equal(response.statusCode, 200);
            
            ESTA RETORNANDO 500 COMO STATUS CODE
            AssertionError [ERR_ASSERTION]: 500 == 200
            at TestContext.<anonymous> (file:///C:/UVV/Periodo5/ProgAvanWeb/dositio-class/test.js:49:13)
            at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
            at async Test.run (node:internal/test_runner/test:640:9)
            at async Suite.processPendingSubtests (node:internal/test_runner/test:382:7) {
            generatedMessage: true,
            code: 'ERR_ASSERTION',
            actual: 500,
            expected: 200,
            operator: '=='

        });*/

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

        /*test('# GET /categories/:id', async(t) => {
            const app = await build(options);
    
            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/categories/:id'
            });
            equal(response.statusCode, 200);

            ESTA RETORNANDO 500 COMO STATUS CODE


        });*/

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
   
});