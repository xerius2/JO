const SportService = require('../services/sport.service');
const AthleteService = require('../services/athlete.service');

class SportController {

	constructor() {
		// on créé une nouvelle instance de SportService que l'on ajoute à notre attribut
		this.sportService = new SportService();
		this.athleteService = new AthleteService();
	}

	async list(req, res) {
		const sports = await this.sportService.list();
		const athletes = await this.athleteService.list(req, res);
        res.render('sport', { sports,athletes, authorized : true});
	}

	async create(req, res) {

		const sport = req.body;
		const created = await this.sportService.create(sport, res);
		res.redirect('/sports');
	}

	async get(req, res) {
		const sportId = req.params.sportId;
		const getSport = await this.sportService.get(sportId, res);
		let athletes = [];

		for (const element of getSport.athletes) {
			const ath = await this.athleteService.get(element, '');
			if(ath !== null){
				athletes.push(ath);
			}
		  }
        res.render('sportEdit', { sport: getSport, athletes:athletes});
	}

	async delete(req, res) {
		const sportId = req.params.sportId;
		const getSport = await this.sportService.delete(sportId, res);

		res.redirect('/sports');
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
		res.redirect('/sports');
	}

	async addAthlete(req, res) {
		const sportId = req.body.sportId;
		const athleteId = req.body.athleteId;

		const sport = await this.sportService.addAthlete(sportId, athleteId, res)
		res.redirect('/sports');
	}

	async removeAthlete(req, res) {
		const sportId = req.params.sportId;
		const athleteId = req.params.athleteId;

		const sport = await this.sportService.removeAthlete(sportId, athleteId, res)
		res.redirect('/sports');
	}
}
// on n'oublie pas d'exporter notre Controller
module.exports = SportController;