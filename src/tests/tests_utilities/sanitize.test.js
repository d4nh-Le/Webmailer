const request = require('supertest');
const express = require('express');
const { validationResult } = require('express-validator');
const { sanitizeKey, sanitizeWebsitePage, sanitizeIp } = require('../../utilities/sanitize.utility');

const app = express();

/* Open testing routes */
app.get('/testKey', sanitizeKey, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array()[0].msg);
    }
    res.status(200).send(req.query.key);
  });

app.get('/testPage', sanitizeWebsitePage, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array()[0].msg);
    }
  res.status(200).send(req.query.page);
});

app.get('/testIP', sanitizeIp, (req, res) => {
    res.status(200).send(req.query.IP);
  });

describe('sanitize.utility', () => {

    /* Parameter: key */
  it('sanitizeKey key query parameter is required', async () => {
    const response = await request(app)
        .get('/testKey');

    expect(response.status).toBe(400);
    expect(response.text).toBe('Missing required parameter: key');
    });

  it('sanitizeKey should sanitize - trim() the key query parameter', async () => {
    const response = await request(app)
      .get('/testKey')
      .query({ key: '  webmailer_generatedtestkey0001   ' });

    expect(response.status).toBe(200);
    expect(response.text).toBe('webmailer_generatedtestkey0001');
  });

  it('sanitizeKey should sanitize - escape() the website_page query parameter', async () => {
    const response = await request(app)
      .get('/testKey')
      .query({ key: '<script>webmailer_generatedtestkey0001</script>' });

    expect(response.status).toBe(200);
    expect(response.text).toBe('&lt;script&gt;webmailer_generatedtestkey0001&lt;&#x2F;script&gt;');
  });

    /* Parameter: page */
    it('sanitizeWebsitePage page query parameter is required', async () => {
        const response = await request(app)
        .get('/testPage');

        expect(response.status).toBe(400);
        expect(response.text).toBe('Missing required parameter: page');
    });

    it('sanitizeWebsitePage should sanitize - trim() the website_page query parameter', async () => {
        const response = await request(app)
        .get('/testPage')
        .query({page: '  portfolio   ' });
    
        expect(response.status).toBe(200);
        expect(response.text).toBe('portfolio');
    });

    it('sanitizeWebsitePage should sanitize - escape() the website_page query parameter', async () => {
        const response = await request(app)
        .get('/testPage')
        .query({page: '<script>portfolio</script>' });
    
        expect(response.status).toBe(200);
        expect(response.text).toBe('&lt;script&gt;portfolio&lt;&#x2F;script&gt;');
    });

    // it('sanitizeIP should return 200 if ip is valid', async () => {
    //     const res = await request(app)
    //       .get('/testIP')
    //       .query({ IP: '192.168.1.1' });
    
    //     expect(res.statusCode).toEqual(200);
    //     expect(res.body).toHaveProperty('IP', '192.168.1.1');
    //   });
    
    //   it('sanitizeIP should return 400 if ip is invalid', async () => {
    //     const res = await request(app)
    //       .get('/testIP')
    //       .query({ ip: 'invalid-ip' });
    
    //     expect(res.statusCode).toEqual(400);
    //     expect(res.body.errors[0].msg).toEqual('Invalid parameter: IP');
    //   });
    
    //   it('sanitizeIP should return 200 if ip is not provided', async () => {
    //     const res = await request(app)
    //       .get('/testIP');
    
    //     expect(res.statusCode).toEqual(200);
    //   });
});
