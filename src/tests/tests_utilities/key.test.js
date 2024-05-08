const keyModule = require('../../utilities/key.utility');

describe('Key.utility - generateKey()', () => {

    it('Check key is not null functionality', () => {
        const key = keyModule.generateKey();
        expect(key).not.toBeNull();
    });

    it('Check key is string functionality', () => {
        const key = keyModule.generateKey();
        expect(typeof key).toBe('string');
    });

    it('Check generated key length functionality', () => {
        const key = keyModule.generateKey();
        expect(key.length).toBe(30);
    });

    it('Check generated unique key functionality', () => {
        const key1 = keyModule.generateKey();
        const key2 = keyModule.generateKey();
        expect(key1).not.toBe(key2);
      });
});

describe('Key.utility - checkValidKey()', () => {
    it('Check undefined key functionality', () => {
        const key = undefined;
        expect(keyModule.checkValidKey(key)).toBe(false);
    });

    it('Check null key functionality', () => {
        const key = null;
        expect(keyModule.checkValidKey(key)).toBe(false);
    });

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
    it('Check return correct key_info functionality', async () => {
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

    it('Check return false if key not found functionality', async () => {
        const keyInfo = await keyModule.getKeyInfo('webmailer_generatedtestkey0002');
        expect(keyInfo).toBe(null);
    });
});