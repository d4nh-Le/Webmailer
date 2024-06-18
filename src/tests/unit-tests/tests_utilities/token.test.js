const TokenModule = require('../../../utilities/token.utility');

describe('Token.utility - generateKey()', () => {

    it('Check token is not null functionality', () => {
        const key = TokenModule.generateToken();
        expect(key).not.toBeNull();
    });

    it('Check token is string functionality', () => {
        const key = TokenModule.generateToken();
        expect(typeof key).toBe('string');
    });

    it('Check generated token length functionality', () => {
        const key = TokenModule.generateToken();
        expect(key.length).toBe(30);
    });

    it('Check generated unique token functionality', () => {
        const key1 = TokenModule.generateToken();
        const key2 = TokenModule.generateToken();
        expect(key1).not.toBe(key2);
      });
});