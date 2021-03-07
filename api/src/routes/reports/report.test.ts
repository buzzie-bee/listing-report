import { testApp } from '../../index';
import supertest from 'supertest';

// Test if default endpoint works
describe('GET /api/reports/average', () => {
  it('Returns an average report object', async () => {
    const result = await supertest(testApp).get('/reports/average');
    expect(result.status).toEqual(200);
    expect(result.type).toBe('application/json');
    expect(result.body).toHaveProperty('dealer');
    expect(result.body).toHaveProperty('private');
    expect(result.body).toHaveProperty('other');
  });
});
