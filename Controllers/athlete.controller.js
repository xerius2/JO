const athlete = require('../models/athlete');
const AthleteService = require('../services/athlete.service');
const SportService = require('../services/sport.service');


class AthleteController {
    constructor() {
        // on créé une nouvelle instance de AthleteService que l'on ajoute à notre attribut
        this.athleteService = new AthleteService();
    }

    async list(req, res){
        const athletes = await this.athleteService.list(req, res);

        res.json({
            count: athletes.length,
            athletes: athletes,
        })
    }
    async create(req, res) {
        const athlete = req.body;
        const created = await this.athleteService.create(athlete, res);
        res.send(created);
    }

    async get(req, res) {
        const athleteId = req.params.athleteId;

        const getAthlete = await this.athleteService.create(athleteId, res);

        res.json(json);
    }


    async delete(req, res) {
        const athleteId = req.params.athleteId;
        const getAthlete = await this.athleteService.delete(athleteId, res);

        res.send(getAthlete);
    }

    async update(req, res){
        const athleteId = req.params.athleteId;
        if(!req.body || !req.body.firstName || !req.body.lastName ||
             !req.body.gender || !req.body.country){
                 console.error('Missing required field(s)');
                 res.status(400).end();
                 return
             }
        if(req.body._id && req.body._id !== athleteId){
            console.error('Invalid ID in request');
            res.status(400).end();
            return        
        }
        const athlete = await this.athleteService.update(athleteId,req, res);

    }

    async getSports(req,res){
        const athleteId = req.params.athleteId;
        const getAthleteSports = await this.SportService.getSports(athleteId, res);
        
    }
}
// on n'oublie pas d'exporter notre Controller
module.exports = AthleteController;