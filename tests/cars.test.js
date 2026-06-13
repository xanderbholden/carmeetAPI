const request = require('supertest');

const baseUrl = 'https://carmeetapi.onrender.com';

describe('Cars API', () => {
  test('GET /cars returns 200', async () => {
    const response = await request(baseUrl).get('/cars');
    expect(response.statusCode).toBe(200);
  });
});