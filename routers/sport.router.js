const express = require('express');
const router = express.Router();

const SportController = require('../controllers/sport.controller');
// on créé une nouvelle instance de notre controller !
const sportController = new SportController();

router.get('/api/sports/'), async (req, res) => {
	sportController.list(req, res);
}

router.get('/api/sports/:sportId'), async (req, res) => {
	sportController.get(req, res);
}

router.post('/api/sports/:sportId'), async (req, res) => {
	sportController.update(req, res);
}

router.post('/api/sports/'), async (req, res) => {
	sportController.create(req, res);
}

router.delete('/api/sports/:sportId'), async (req, res) => {
	sportController.delete(req, res);
}

router.post('/api/sports/:sportId/athletes/:athleteId'), async (req, res) => {
	sportController.addAthlete(req, res);
}

router.delete('/api/sports/:sportId/athletes/:athleteId'), async (req, res) => {
	sportController.removeAthlete(req, res);
}

router.get('/sports'), (req, res) => {
	sportController.list(req, res)
}

module.exports = router;

