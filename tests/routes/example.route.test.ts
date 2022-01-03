import request from 'supertest';

import { App } from '../../src/server';

describe('GET /', () => {
  const port = '3000';
  const app = new App(port).getApp();

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
