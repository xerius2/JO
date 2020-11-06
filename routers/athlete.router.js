const express = require('express');
const router = express.Router();

const AthleteController = require('../Controllers/athlete.controller');
// on créé une nouvelle instance de notre controller !
const athleteController = new AthleteController();

router.get('/api/athletes/'), async (req,res) => {
    athleteController.list(req,res);
}

router.get('/api/athletes/:athleteId'), async (req,res) => { // consulter l'athlete et ses sports
    athleteController.get(req,res);
}

router.post('/api/athletes/:athleteId'), async (req,res) => { // changer les infos de l'athlete
    athleteController.update(req,res);
}

router.post('/api/athletes/'), async (req,res) => {
    athleteController.create(req,res);
}

router.delete('/api/athletes/:athleteId'), async (req,res) => {
    athleteController.delete(req,res);
}
module.exports = router;

