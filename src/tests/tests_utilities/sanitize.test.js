const request = require('supertest');
const express = require('express');
const { validationResult } = require('express-validator');
const { sanitizeKey, sanitizePage, sanitizeIp, sanitizeReferer } = require('../../utilities/sanitize.utility');

const app = express();

/* Open testing routes */
app.get('/testKey', sanitizeKey, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array()[0].msg);
    }
    res.status(200).send(req.query.key);
  });

app.get('/testPage', sanitizePage, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array()[0].msg);
    }
  res.status(200).send(req.query.page);
});

app.get('/testIP', sanitizeIp, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array()[0].msg);
    }

    res.status(200).send(req.query.IP);
  });

app.get('/testReferer', sanitizeReferer, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array()[0].msg);
    }

    res.status(200).send(req.query.referer);
  });

describe('sanitize.utility', () => {

    /* Parameter: key 
        * key query parameter is REQUIRED
        * trim() the key query parameter
        * escape() the key query parameter
    */
  it('sanitizeKey key query parameter is REQUIRED', async () => {
    const response = await request(app)
        .get('/testKey');

    expect(response.status).toBe(400);
    expect(response.text).toBe('S101 - Missing required parameter: key');
    });

  it('sanitizeKey should sanitize - trim() the key query parameter', async () => {
    const response = await request(app)
      .get('/testKey')
      .query({ key: '  webmailer_generatedtestkey0001   ' });

    expect(response.status).toBe(200);
    expect(response.text).toBe('webmailer_generatedtestkey0001');
  });

  it('sanitizeKey should sanitize - escape() the key query parameter', async () => {
    const response = await request(app)
      .get('/testKey')
      .query({ key: '<script>webmailer_generatedtestkey0001</script>' });

    expect(response.status).toBe(200);
    expect(response.text).toBe('&lt;script&gt;webmailer_generatedtestkey0001&lt;&#x2F;script&gt;');
  });

    /* Parameter: page 
        * page query parameter is REQUIRED
        * page query parameter is less than 70 characters
        * trim() the page query parameter
        * escape() the page query parameter
    */

    it('sanitizePage page query parameter is REQUIRED', async () => {
        const response = await request(app)
        .get('/testPage');

        expect(response.status).toBe(400);
        expect(response.text).toBe('S1021 - Missing required parameter: page');
    });

    it('sanitizePage should sanitize - page query parameter is less than 70 characters', async () => {
        const response = await request(app)
        .get('/testPage')
        .query({page: 'portfolio' });

        expect(response.status).toBe(200);
    });

    it('sanitizePage should sanitize - page query parameter is more than 70 characters', async () => {
        const response = await request(app)
        .get('/testPage')
        .query({page: 'longparameterswillnotbeacceptedlongparameterswillnotbeacceptedlongparameterswillnotbeaccepted' });

        expect(response.status).toBe(400);
        expect(response.text).toBe('S1022 - Invalid parameter: page - must be less than 70 characters');
    });

    it('sanitizePage should sanitize - trim() the page query parameter', async () => {
        const response = await request(app)
        .get('/testPage')
        .query({page: '  portfolio   ' });
    
        expect(response.status).toBe(200);
        expect(response.text).toBe('portfolio');
    });

    it('sanitizePage should sanitize - escape() the page query parameter', async () => {
        const response = await request(app)
        .get('/testPage')
        .query({page: '<script>portfolio</script>' });
    
        expect(response.status).toBe(200);
        expect(response.text).toBe('&lt;script&gt;portfolio&lt;&#x2F;script&gt;');
    });

    /* Parameter: IP 
        * IP query parameter is OPTIONAL
        * IP query parameter is a valid IPv4 address
        * IP query parameter is an invalid IP address
    */
    it('sanitizeIp page query parameter is OPTIONAL', async () => {
        const res = await request(app)
          .get('/testIP');
    
        expect(res.statusCode).toEqual(200);
      });

    it('sanitizeIp should sanitize - IP query parameter correct format', async () => {
        const response = await request(app)
        .get('/testIP')
        .query({IP: '100.100.100.100' });

        expect(response.status).toBe(200);
    });

    it('sanitizeIp should sanitize - IP query parameter incorrect format', async () => {
        const response = await request(app)
        .get('/testIP')
        .query({IP: 'invalidIP' });

        expect(response.status).toBe(400);
        expect(response.text).toBe('S103 - Invalid parameter: IP');
    });

    /* Parameter: referer 
        * referer query parameter is OPTIONAL
        * referer query parameter is a valid URL
        * referer query parameter is an invalid URL
        * referer query parameter should be sanitized to only return the domain
        * referer query parameter URL parameters should be removed from the domain
        * referer query parameter deny access when referer query parameter contains invalid characters
    */
    it('sanitizeReferer referer query parameter is OPTIONAL', async () => {
        const res = await request(app)
          .get('/testReferer');
    
        expect(res.statusCode).toEqual(200);
      });

    it('sanitizeReferer should sanitize - referer query parameter correct format', async () => {
        const response = await request(app)
        .get('/testReferer')
        .query({referer: 'https://www.google.com' });

        expect(response.status).toBe(200);
    });

    it('sanitizeReferer should sanitize - referer query parameter incorrect format', async () => {
        const response = await request(app)
        .get('/testReferer')
        .query({referer: 'invalidURL' });

        expect(response.status).toBe(400);
        expect(response.text).toBe('S104 - Invalid parameter: referer');
    });

    it('sanitizeReferer should sanitize - referer query parameter should be sanitized to only return the domain', async () => {
        const response = await request(app)
        .get('/testReferer')
        .query({referer: 'https://www.google.com' });

        expect(response.status).toBe(200);
        expect(response.text).toBe('www.google.com');
    });

    it('sanitizeReferer should sanitize - referer query parameter URL parameters should be removed from the domain', async () => {
        const response = await request(app)
        .get('/testReferer')
        .query({referer: 'https://www.google.com/maps/place/Calgary+Tower/@51.0443113,-114.0656663,17z/data=!3m1!4b1!4m6!3m5!1s0x53716ffd8b6c3227:0xf1592407377b9781!8m2!3d51.044308!4d-114.0630914!16zL20vMDNjaDFq?entry=ttu'});

        expect(response.status).toBe(200);
        expect(response.text).toBe('www.google.com');
    });

    it('sanitizeReferer should sanitize - referer query parameter denies access when referer query parameter contains invalid characters', async () => {
        const response = await request(app)
        .get('/testReferer')
        .query({referer: 'https://www.google.com/<script>alert("malicious script")</script>'});

        expect(response.status).toBe(400);
    });
});
