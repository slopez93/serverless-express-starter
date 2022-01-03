import request from 'supertest';

import { App } from '../../src/server';

describe('GET /', () => {
  const app = new App('3000').getApp();

  test('when http request on / then return 200 success response', async () => {
    await request(app)
      .get('/')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          message: 'Serverless express running!'
        });
      });
  });
});
