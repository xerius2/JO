const Country = require('../models/country');

class CountryService {

	async list() {
		return Country;
	}
}

// on n'oublie pas d'exporter notre Service
module.exports = CountryService;