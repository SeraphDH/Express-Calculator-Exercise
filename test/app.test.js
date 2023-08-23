const request = require('supertest');
const app = require('../src/app');

describe('GET /mean', () => {
  it('calculates the mean correctly', async () => {
    const response = await request(app).get('/mean?nums=1,2,3,4,5');
    expect(response.status).toBe(200);
    expect(response.body.operation).toBe('mean');
    expect(response.body.value).toBe(3);
  });

  it('handles invalid input', async () => {
    const response = await request(app).get('/mean?nums=1,2,3,foo');
    expect(response.status).toBe(400);
  });

  it('handles missing nums parameter', async () => {
    const response = await request(app).get('/mean');
    expect(response.status).toBe(400);
  });
});

describe('GET /median', () => {
  it('calculates the median correctly', async () => {
    const response = await request(app).get('/median?nums=1,2,3,4,5');
    expect(response.status).toBe(200);
    expect(response.body.operation).toBe('median');
    expect(response.body.value).toBe(3);
  });

  it('handles invalid input', async () => {
    const response = await request(app).get('/median?nums=1,2,3,foo');
    expect(response.status).toBe(400);
  });

  it('handles missing nums parameter', async () => {
    const response = await request(app).get('/median');
    expect(response.status).toBe(400);
  });
});

describe('GET /mode', () => {
  it('calculates the mode correctly', async () => {
    const response = await request(app).get('/mode?nums=1,2,3,3,4,4,5');
    expect(response.status).toBe(200);
    expect(response.body.operation).toBe('mode');
    expect(response.body.value).toEqual([3, 4]);
  });

  it('handles invalid input', async () => {
    const response = await request(app).get('/mode?nums=1,2,3,foo');
    expect(response.status).toBe(400);
  });

  it('handles missing nums parameter', async () => {
    const response = await request(app).get('/mode');
    expect(response.status).toBe(400);
  });
});
