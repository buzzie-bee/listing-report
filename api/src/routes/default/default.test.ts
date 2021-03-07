import { testApp } from '../../index';
import supertest from 'supertest';

// Check jest is working
it('Testing to see if Jest works', () => {
  expect(1).toBe(1);
});

// Test if default endpoint works
describe('GET /api/ - Default route', () => {
  it('Returns the default message', async () => {
    const result = await supertest(testApp).get('/api/');
    expect(result.status).toEqual(200);
    expect(result.text).toBe('App is initialised');
  });
});
