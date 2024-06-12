const request = require('supertest');
const express = require('express');
const { validateKey, validateWebsitePage } = require('../../utilities/mailer_utilities/Mailer_validation.utility');

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
    expect(response.body.errors[0].msg).toBe('MV203 - Invalid parameter: key - length error');
  });
});