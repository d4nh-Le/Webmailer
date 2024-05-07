const { checkValidKey } = require('../utilities/key.utility');

describe('checkValidKey', () => {
    it('Key.utility - check valid key functionality', () => {
        const key = 'webmailer_generatedtestkey0001';
        expect(checkValidKey(key)).toBe(true);
    });

    it('Key.utility - check invalid key functionality', () => {
        const key = 'webmailer_generatedtestkey0002';
        expect(checkValidKey(key)).toBe(false);
    });

    it('Key.utility - check key length functionality', () => {
        const key = 'webmailer_generatedtestkey001';
        expect(checkValidKey(key)).toBe(false);
    });
});