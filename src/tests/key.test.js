const keyModule = require('../utilities/key.utility');



describe('Key.utility - checkValidKey()', () => {
    it('Check valid key functionality', () => {
        const key = 'webmailer_generatedtestkey0001';
        expect(keyModule.checkValidKey(key)).toBe(true);
    });

    it('Check invalid key functionality', () => {
        const key = 'webmailer_generatedtestkey0002';
        expect(keyModule.checkValidKey(key)).toBe(false);
    });

    it('Check key length functionality', () => {
        const key = 'webmailer_generatedtestkey001';
        expect(keyModule.checkValidKey(key)).toBe(false);
    });
});

describe('Key.utility - getKeyInfo()', () => {
    it('Key.utility - check return correct key_info functionality', async () => {
        const keyInfo = await keyModule.getKeyInfo('webmailer_generatedtestkey0001')[0];

        const expectedKeyInfo = {
            username : "Test0001",
            email : "testkey@test.com",
            website : "https://onlytestkey.com"
        };

        expect(keyInfo.username).toEqual(expectedKeyInfo.username);
        expect(keyInfo.email).toEqual(expectedKeyInfo.email);
        expect(keyInfo.website).toEqual(expectedKeyInfo.website);
    });
});