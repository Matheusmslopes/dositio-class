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
   });
    describe('##Bad Request', async(t) => {
    
    })
});

describe('### Tests for authenticated routes', async(t) => {
   
});