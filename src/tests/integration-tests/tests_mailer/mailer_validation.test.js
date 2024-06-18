const request = require('supertest');
const express = require('express');
const { validateKey, validateRequestParameters } = require('../../../utilities/mailer_utilities/Mailer_validation.utility');

const app = express();

app.get('/testKeyLength', validateKey, (req, res) => {
  res.status(200).send('Valid key length');
});

app.get('/testQuery', validateRequestParameters, (req, res) => {
  res.status(200).send('Valid parameters');
});


describe('Validation.utility - validateKey', () => {
  it('validateKey should return an error for invalid key', async () => {
    const response = await request(app)
      .get('/testKeyLength')
      .query({ key: 'short' });

    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('MV203 - Invalid parameter: key - length error');
  });

  it('validateKey should return an error for empty key', async () => {
    const response = await request(app)
      .get('/testKeyLength')
      .query({ key: '' });

    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('MV203 - Invalid parameter: key - length error');
  });

  it('validateKey should return an success for valid key length', async () => {
    const response = await request(app)
      .get('/testKeyLength')
      .query({ key: 'thisisaverylongkeythatshouldpa' });

    expect(response.status).toBe(200);
    expect(response.text).toBe('Valid key length');
  });
});

describe('Validation.utility - validateRequestParameters', () => {
  it('validateRequestParameters should return an error for missing required parameter', async () => {
    const response = await request(app)
      .get('/testQuery');

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('MV202 - Missing required parameter: key');
  });

  it('validateRequestParameters should return an error for invalid parameter', async () => {
    const response = await request(app)
      .get('/testQuery')
      .query({ key: 'valid', invalid: 'invalid' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('MV201 - Invalid parameter: invalid');
  });

  it('validateRequestParameters should return an success for valid parameters', async () => {
    const response = await request(app)
      .get('/testQuery')
      .query({ key: 'valid', page: 'valid' });

    expect(response.status).toBe(200);
    expect(response.text).toBe('Valid parameters');
  });
});


