const request = require('supertest');
const express = require('express');
const { validationResult } = require('express-validator');
const { sanitizeQuery } = require('../../utilities/sanitize.utility');
const { validateQuery } = require('../../utilities/validation.utility');

const app = express();

/* Open testing routes */
app.get('/testQuery', sanitizeQuery , (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array()[0].msg);
    }
    res.status(200).send(req.query);
  });


describe('Query - incoming requests to server security', () => {

    /* Parameter: query 
        * all REQUIRED PARAMETERS are needed to process: `key`, `page`
        * `key` query parameter is missing
        * `page` query parameter is missing
        * `key` query parameter is correct format
        * `page` query parameter is correct format
        * `ip` query parameter is correct format
        * `referer` query parameter is correct format
        * `key` query parameter is incorrect format
        * `page` query parameter is incorrect format
        * `ip` query parameter is incorrect format
        * `referer` query parameter is incorrect format
        * `ip` query parameter is optional
        * `referer` query parameter is optional
        * check unknown query parameter
        * 
    */
    it('sanitizeQuery should return an error for missing required parameter: key', async () => {
        const response = await request(app)
            .get('/testQuery')
            .query({ page: 'home', ip: '10.10.10.10', referer: 'http://www.google.com' });

        expect(response.status).toBe(400);
        expect(response.text).toBe('V202 - Missing required parameter: key');
    }
    );

    it('sanitizeQuery should return an error for missing required parameter: page', async () => {
        const response = await request(app)
            .get('/testQuery')
            .query({ key: '123456789012345678901234567890', ip: '10.10.10.10', referer: 'http://www.google.com' });

        expect(response.status).toBe(400);
        expect(response.text).toBe('V202 - Missing required parameter: page');
    }
    );

    it('sanitizeQuery should sanitize - trim() the key query parameter', async () => {
        const response = await request(app)
            .get('/testQuery')
            .query({ key: ' 123456789012345678901234567890 ', page: 'home', ip: '10.10.10.10', referer: 'http://www.google.com' });

        expect(response.status).toBe(200);
        expect(response.text).toBe('{"key":"123456789012345678901234567890","page":"home","ip":"10.10.10.10","referer":"http://www.google.com"}');
    }
    );

    it('sanitizeQuery should sanitize - trim() the page query parameter', async () => {
        const response = await request(app)
            .get('/testQuery')
            .query({ key: '123456789012345678901234567890', page: ' home ', ip: '10.10.10.10', referer: 'http://www.google.com' });

        expect(response.status).toBe(200);
        expect(response.text).toBe('{"key":"123456789012345678901234567890","page":"home","ip":"10.10.10.10","referer":"http://www.google.com"}');
    }
    );
});
