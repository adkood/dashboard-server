const request = require('supertest');
const app = require('../app');
const pool = require('../db');

describe('getDataPerMonth endpoint', () => {
  it('should return data for a specific month', async () => {
    const response = await request(app)
      .get('/api/getPerMonthForYear?meatId=2&outletId=1&year=2022&month=1');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Data fetched!');
    expect(response.body).toHaveProperty('data');
  });

  it('should handle errors gracefully', async () => {
    const queryMock = jest.spyOn(pool, 'query');
    queryMock.mockImplementation((sql, params, callback) => {
      callback(new Error('Test error'), null);
    });

    const response = await request(app)
      .get('/api/getPerMonthForYear?meatId=2&outletId=1&year=2022&month=1');

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Internal server error');

    queryMock.mockRestore();
  });
});

describe('getRefillDataPerMonth endpoint', () => {
  it('should return refill data for a specific month', async () => {
    const response = await request(app)
      .get('/api/getRefillPerMonthForYear?meatId=2&inventoryId=1&year=2022&month=1');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Refill data Fetched');
    expect(response.body).toHaveProperty('data');
  });

  it('should handle errors gracefully', async () => {
    
    const queryMock = jest.spyOn(pool, 'query');
    queryMock.mockImplementation((sql, params, callback) => {
      callback(new Error('Test error'), null);
    });

    const response = await request(app)
      .get('/api/getRefillPerMonthForYear?meatId=2&inventoryId=1&year=2022&month=1');

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Internal server error');
    queryMock.mockRestore();
  });
});

describe('getPopularity endpoint', () => {
  it('should return popularity data', async () => {
    const response = await request(app)
      .get('/api/getPolularity');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Popularity Fetched!');
    expect(response.body).toHaveProperty('data');
  });

  it('should handle errors gracefully', async () => {
    const queryMock = jest.spyOn(pool, 'query');
    queryMock.mockImplementation((sql, callback) => {
      callback(new Error('Test error'), null);
    });

    const response = await request(app)
      .get('/api/getPolularity');

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Internal server error');
    queryMock.mockRestore();
  });
});
