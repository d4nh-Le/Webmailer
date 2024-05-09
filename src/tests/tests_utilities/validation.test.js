const request = require('supertest');
const express = require('express');
const { validateKey, validateWebsitePage } = require('../../utilities/validation.utility');

const app = express();

app.get('/testKey', validateKey, (req, res) => {
  res.status(200).send('Valid key');
});

app.get('/testWebsitePage', validateWebsitePage, (req, res) => {
  res.status(200).send('Valid website_page');
});

describe('Validation.utility', () => {
  it('validateKey should return an error for invalid key', async () => {
    const response = await request(app)
      .get('/testKey')
      .query({ key: 'short' });

    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('Invalid key - length error');
  });

  it('validateWebsitePage should return an error for invalid website_page', async () => {
    const response = await request(app)
      .get('/testWebsitePage')
      .query({ website_page: 'not a url' });

    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('Invalid website_page - URL error');
  });
});