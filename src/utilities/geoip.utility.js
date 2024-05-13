const geoip = require('geoip-lite');
const countries = require('countries-list');

/*
* Get the city and country from the IP address
* @param {string} ip
* @returns {object} city and country
*/
function getGeoIp(ip) {
    try {
        const ipInfo = geoip.lookup(ip);
        if (!ipInfo || !ipInfo.city || !ipInfo.country) {
            return ('Unavailable');
        }

        const countryName = countries.countries[ipInfo.country].name;
        const filteredIpInfo = {
            city: ipInfo.city,
            country: countryName,
        };
        return filteredIpInfo;
    }
    catch (err) {
        console.error(err);
        return null;
    }
}

exports.getGeoIp = getGeoIp;
