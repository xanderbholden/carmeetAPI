const request = require('supertest');
const app = require('../server');

describe('Attendees API', () => {
  test('GET /attendees returns 200', async () => {
    const response = await request(app).get('/attendees');

    expect(response.statusCode).toBe(200);
  });
});