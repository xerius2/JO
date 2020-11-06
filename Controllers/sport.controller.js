const sport = require('../models/sport');
const SportService = require('../services/sport.service');

class SportController {

	constructor() {
		// on créé une nouvelle instance de SportService que l'on ajoute à notre attribut
		this.sportService = new SportService();
		console.log('zozo');
	}

	async list(req, res) {
		const sports = await this.sportService.list(req, res);

        res.render('index_sports', { sports });
	}

	async create(req, res) {
		const sport = req.body;
		const created = await this.sportService.create(sport, res);
		res.send(created);
	}

	async get(req, res) {
		const sportId = req.params.sportId;

		const getSport = await this.sportService.get(sportId, res);

		res.json(json);
	}

	async delete(req, res) {
		const sportId = req.params.sportId;
		const getSport = await this.sportService.delete(sportId, res);

		res.send(getSport);
	}

	async update(req, res) {
		const sportId = req.params.sportId;
		if (!req.body || !req.body.name) {
			console.error('Missing required field(s)');
			res.status(400).end();
			return
		}
		if (req.body._id && req.body._id !== sportId) {
			console.error('Invalid ID in request');
			res.status(400).end();
			return
		}
		const athlete = await this.sportService.update(sportId, req, res);
	}

	async addAthlete(req, res) {
		const sportId = req.params.sportId;
		const athleteId = req.params.athleteId;

		const sport = await this.sportService.addAthlete(sportId, athleteId, res)
	}

	async removeAthlete(req, res) {
		const sportId = req.params.sportId;
		const athleteId = req.params.athleteId;

		const sport = await this.sportService.removeAthlete(sportId, athleteId, res)
	}
}
// on n'oublie pas d'exporter notre Controller
module.exports = SportController;