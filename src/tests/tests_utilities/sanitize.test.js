const request = require('supertest');
const express = require('express');
const { sanitizeKey, sanitizeWebsitePage } = require('../../utilities/sanitize.utility');

const app = express();

app.get('/testKey', sanitizeKey, (req, res) => {
  res.status(200).send(req.query.key);
});

app.get('/testWebsitePage', sanitizeWebsitePage, (req, res) => {
  res.status(200).send(req.query.website_page);
});

describe('sanitize.utility', () => {
  it('sanitizeKey should sanitize - trim() the key query parameter', async () => {
    const response = await request(app)
      .get('/testKey')
      .query({ key: '  webmailer_generatedtestkey0001   ' });

    expect(response.status).toBe(200);
    expect(response.text).toBe('webmailer_generatedtestkey0001');
  });

  it('sanitizeWebsitePage should sanitize - escape() the website_page query parameter', async () => {
    const response = await request(app)
      .get('/testKey')
      .query({ key: '<script>webmailer_generatedtestkey0001</script>' });

    expect(response.status).toBe(200);
    expect(response.text).toBe('&lt;script&gt;webmailer_generatedtestkey0001&lt;&#x2F;script&gt;');
  });

    it('sanitizeWebsitePage should sanitize - trim() the website_page query parameter', async () => {
        const response = await request(app)
        .get('/testWebsitePage')
        .query({ website_page: '  portfolio   ' });
    
        expect(response.status).toBe(200);
        expect(response.text).toBe('portfolio');
    });

    it('sanitizeWebsitePage should sanitize - escape() the website_page query parameter', async () => {
        const response = await request(app)
        .get('/testWebsitePage')
        .query({ website_page: '<script>portfolio</script>' });
    
        expect(response.status).toBe(200);
        expect(response.text).toBe('&lt;script&gt;portfolio&lt;&#x2F;script&gt;');
    });
});
