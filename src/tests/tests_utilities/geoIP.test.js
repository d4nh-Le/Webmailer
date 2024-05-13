const Locator = require('../../utilities/geoip.utility');

describe('GeoIP', () => {

    /* Parameter: ip 
        * Check city and country
        * Return `unavailable` if city or country cannot be lookup
        * Return `unavailable` if IP is invalid
    */
    it('Check getGeoIPInfo() functionality - Canada', async () => {
        const ip = "70.75.135.126";
        const geoIPInfo = await Locator.getGeoIp(ip);

        let testCity = geoIPInfo.city;
        let testCountry = geoIPInfo.country;

        expect(testCity).toBe("Calgary");
        expect(testCountry).toBe("Canada");
    });

    it('Check getGeoIPInfo() functionality - US', async () => {
        const ip = "44.201.44.33";
        const geoIPInfo = await Locator.getGeoIp(ip);

        let testCity = geoIPInfo.city;
        let testCountry = geoIPInfo.country;

        expect(testCity).toBe("Ashburn");
        expect(testCountry).toBe("United States");
    });

    it('Check getGeoIPInfo() functionality', async () => {
        const ip = "86.44.72.63";
        const geoIPInfo = await Locator.getGeoIp(ip);

        let testCity = geoIPInfo.city;
        let testCountry = geoIPInfo.country;

        expect(testCity).toBe("Sligo");
        expect(testCountry).toBe("Ireland");
    });

    it('Check getGeoIPInfo() functionality', async () => {
        const ip = "42.119.236.45";
        const geoIPInfo = await Locator.getGeoIp(ip);

        let testCity = geoIPInfo.city;
        let testCountry = geoIPInfo.country;

        expect(testCity).toBe("Ho Chi Minh City");
        expect(testCountry).toBe("Vietnam");
    });

    it('Check getGeoIPInfo() functionality - unavailable', async () => {
        const ip = "10.10.10.10";
        const geoIPInfo = await Locator.getGeoIp(ip);

        expect(geoIPInfo).toBe("Unavailable");
    });

    it('Check getGeoIPInfo() functionality - invalid ip', async () => {
        const ip = "invalidip";
        const geoIPInfo = await Locator.getGeoIp(ip);

        expect(geoIPInfo).toBe("Unavailable");
    });
});