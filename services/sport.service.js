const Sport = require('../models/sport');

// Une class SportService
class SportService {
    constructor() { }

    async create(sport, res) {
        if(!sport){
            console.log('filed name expected')
            res.status(400).end();
            return;
        }
        const newSport = new Sport({
            name: sport.name,
        });

        try {
            await newSport.save();
            res.status(201).json(newSport);
        } catch (error) {
            console.log('Error durng sport creation', err)
            res.status(500).end();
        }
    }

    async get(sportId, res){
        const sport = await Sport.findById(sportId);

        if(!sport){
            console.error('Sport not found')
            res.status('404').end();
            return;
        }
        return sport;
    }

    async list(req, res){
        const sports = await Sport.find();
        return sports;
    }

    async delete(sportId, res){
        const sport = await Sport.findByIdAndDelete(sportId);

        if(sport){
            console.log('deleted')
        }
        else{
            console.error('Sport not found')
            res.status('404').end();
            return;
        }
    }

    async update(sportId,req, res){
        const sport = await AthleteController.findById(sportId);
        if(!sport){
            console.error('Sport not found');
            res.status(404).end();
            return;
        }
        sport.name = req.body.name;

        try {
            await sport.save();
            res.status(201).json(sport);
        } catch (error) {
            console.log('Error during sport update', err)
            res.status(500).end();
        }
    }

    async addAthlete(sportId, athleteId, res){
        const sport = await AthleteController.findById(sportId);

        sport.athletes = [sport.athletes,athleteId];

        try {
            await sport.save();
            res.status(201).json(sport);
        } catch (error) {
            console.log('Error during athlete add', err)
            res.status(500).end();
        }
    }
}

// on n'oublie pas d'exporter notre Service
module.exports = SportService;