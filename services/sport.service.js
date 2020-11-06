const Sport = require('../models/sport');
const Athlete = require('../models/athlete');
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
            return sport;
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
        const sport = await Sport.findById(sportId);
        if(!sport){
            console.error('Sport not found');
            res.status(404).end();
            return;
        }
        sport.name = req.body.name;

        try {
            await sport.save();
            return sport;
        } catch (error) {
            console.log('Error during sport update', err)
            res.status(500).end();
        }
    }

    async addAthlete(sportId, athleteId, res){
        const sport = await Sport.findById(sportId);
        var bool = false;
        sport.athletes.forEach(element => {
            if(element == athleteId){
                bool = true;
            }
        });
        if(!bool){
            sport.athletes.push(athleteId);
        }
        else{
            console.log('l\'athlète fait déjà parti de ce sport')
            res.status(201).json('l\'athlète fait déjà parti de ce sport');
        }

        try {
            await sport.save();
            return true;
        } catch (error) {
            console.log('Error during athlete add', err)
            res.status(500).end();
        }
    }

    async removeAthlete(sportId, athleteId, res){
        const sport = await Sport.findById(sportId);

        sport.athletes.forEach(element => {
            if(element == athleteId){
                sport.athletes.splice([sport.athletes.indexOf(element)], 1);
            }
        });
        try {
            await sport.save();
            return sport
        } catch (error) {
            console.log('Error during athlete remove', err)
            res.status(500).end();
        }
    }

    async getSports(athleteId, res){

        const sports = await Sport.find();
        let arraySport;
        sports.forEach(sport => {
            sport.athletes.forEach(idAthlete => {
                if(athleteId == idAthlete){
                    arraySport.push(sport)
                }
            });
        });
        return arraySport;

    }
}

// on n'oublie pas d'exporter notre Service
module.exports = SportService;