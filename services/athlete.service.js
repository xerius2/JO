const Athlete = require('../models/athlete');

// Une class AthleteService
class AthleteService {
    constructor() { }

    async create(athlete, res) {
        if(!athlete){
            console.log('filed name expected')
            res.status(400).end();
            return;
        }
        const newAthlete = new Athlete({
            firstName: athlete.firstName,
            lastName: athlete.lastName,
            gender: athlete.gender,
            country: athlete.country,
        });

        try {
            await newAthlete.save();
            res.status(201).json(newAthlete);
        } catch (error) {
            console.log('Error during athlete creation', err)
            res.status(500).end();
        }
    }

    async get(athleteId, res){
        const athlete = await Athlete.findById(athleteId);

        if(!athlete){
            console.error('Athlete not found')
            res.status('404').end();
            return;
        }
        return athlete;
    }

    async list(req, res){
        const athletes = await Athlete.find();
        return athletes;
    }

    async delete(athleteId, res){
        const athlete = await Athlete.findByIdAndDelete(athleteId)

        if(athlete){
            console.log('deleted')
        }
        else{
            console.error('Athlete not found')
            res.status('404').end();
            return;
        }
    }

    async update(athleteId,req, res){
        const athlete = await AthleteController.findById(athleteId);
        if(!athlete){
            console.error('Athlete not found');
            res.sattus(404).end();
            return;
        }
        athlete.firstName = req.body.firstName;
        athlete.lastName = req.body.lastName;
        athlete.gender = req.body.gender;
        athlete.country = req.body.country;

        try {
            await athlete.save();
            res.status(201).json(athlete);
        } catch (error) {
            console.log('Error durng athlete update', err)
            res.status(500).end();
        }
    }

}

// on n'oublie pas d'exporter notre Service
module.exports = AthleteService;