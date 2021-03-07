import { testApp } from '../../index';
import supertest from 'supertest';

describe('GET /api/reports/average', () => {
  it('Returns an average report object', async () => {
    const result = await supertest(testApp).get('/reports/average');
    expect(result.status).toEqual(200);
    expect(result.type).toBe('application/json');
    expect(result.body).toHaveProperty('dealer');
    expect(typeof result.body.dealer).toBe('number');
    expect(result.body).toHaveProperty('private');
    expect(typeof result.body.private).toBe('number');
    expect(result.body).toHaveProperty('other');
    expect(typeof result.body.other).toBe('number');
  });
});

it('Returns a distribution report object', async () => {
  const result = await supertest(testApp).get('/reports/distribution');
  expect(result.status).toEqual(200);
  expect(result.type).toBe('application/json');
  expect(result.body).toHaveProperty('total');
  expect(typeof result.body.total).toBe('number');
  expect(result.body).toHaveProperty('distributionData');
  expect(result.body.distributionData).toBeInstanceOf(Array);
});

it('Returns an average price object', async () => {
  const result = await supertest(testApp).get('/reports/averagePopularPrice');
  expect(result.status).toEqual(200);
  expect(result.type).toBe('application/json');
  expect(result.body).toHaveProperty('averagePrice');
  expect(typeof result.body.averagePrice).toBe('number');
});

it('Returns the most contacted listings by month object', async () => {
  const result = await supertest(testApp).get('/reports/mostContactedListings');
  expect(result.status).toEqual(200);
  expect(result.type).toBe('application/json');
  expect(result.body).toHaveProperty('data');
  expect(Array.isArray(result.body.data)).toBe(true);
});
