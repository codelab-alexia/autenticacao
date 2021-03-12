import * as request from 'supertest';

import { bootstrapHTTPServer } from '../../src/http_server';

describe('GET /metrics', () => {
  let app;
  let server;

  beforeAll(() => {
    app = bootstrapHTTPServer();
    server = app.listen(3000);
  });

  afterAll(() => {
    server.close();
  });

  it('works', async () => {
    const res = await request(app).get('/metrics');

    const expectedMetrics = ['incomming_requests'];

    expectedMetrics.forEach((metric: string): void => {
      expect(res.text.includes(metric)).toBeTruthy();
    });
  });
});
