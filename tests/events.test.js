const request = require('supertest');
const app = require('../server');

describe('Events API', () => {
  test('GET /events returns 200', async () => {
    const response = await request(app).get('/events');

    expect(response.statusCode).toBe(200);
  });
});