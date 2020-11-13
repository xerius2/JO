const athlete = require('../models/athlete');
const AthleteService = require('../services/athlete.service');
const CountryService = require('../services/country.service');
const SportService = require('../services/sport.service');

class AthleteController {

	constructor() {
		// on créé une nouvelle instance de AthleteService que l'on ajoute à notre attribut
		this.athleteService = new AthleteService();
		this.countryService = new CountryService();
		this.sportService = new SportService();
	}

	async list(req, res) {
		const athletes = await this.athleteService.list();
		const countries = await this.countryService.list();
		res.render('athlete', {
			count: athletes.length,
			athletes,
			authorized: true,
			countries
		});
	}

	async create(req, res) {
		const athlete = req.body;
		await this.athleteService.create(athlete, res);
	}

	async get(req, res) {
		const athleteId = req.params.athleteId;
		const athlete = await this.athleteService.get(athleteId, res);
		const countries = await this.countryService.list();
		const getSport = await this.sportService.list();

		let sports = [];
		for(const sport of getSport){
			for (const element of sport.athletes) {
				if(athleteId == element){
					sports.push(sport);
				}
			}
		}
		console.log(sports);
		res.render('athleteEdit', {athlete, countries, sports})
	}

	async delete(req, res) {
		const athleteId = req.params.athleteId;
		await this.athleteService.delete(athleteId, res);
	}

	async update(req, res) {
		const athleteId = req.params.athleteId;
		if (!req.body || !req.body.firstName || !req.body.lastName ||
			!req.body.gender || !req.body.country) {
			console.error('Missing required field(s)');
			res.status(400).end();
			return
		}
		if (req.body._id && req.body._id !== athleteId) {
			console.error('Invalid ID in request');
			res.status(400).end();
			return
		}
		await this.athleteService.update(athleteId, req, res);
		res.redirect('/athletes');
	}

	async getSports(req, res) {
		const athleteId = req.params.athleteId;
		const getAthleteSports = await this.SportService.getSports(athleteId, res);

	}
}
// on n'oublie pas d'exporter notre Controller
module.exports = AthleteController;