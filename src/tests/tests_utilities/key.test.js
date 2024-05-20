const TokenModule = require('../../utilities/token.utility');

describe('Key.utility - generateKey()', () => {

    it('Check key is not null functionality', () => {
        const key = TokenModule.generateToken();
        expect(key).not.toBeNull();
    });

    it('Check key is string functionality', () => {
        const key = TokenModule.generateToken();
        expect(typeof key).toBe('string');
    });

    it('Check generated key length functionality', () => {
        const key = TokenModule.generateToken();
        expect(key.length).toBe(30);
    });

    it('Check generated unique key functionality', () => {
        const key1 = TokenModule.generateToken();
        const key2 = TokenModule.generateToken();
        expect(key1).not.toBe(key2);
      });
});