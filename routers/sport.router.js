const express = require('express');

const SportController = require('../controllers/sport.controller');
// on créé une nouvelle instance de notre controller !
const sportController = new SportController();

const router = express.Router();

router.get('/sports', async (req, res) => {
	sportController.list(req, res);
});

router.get('/sport/:sportId', async (req, res) => {
	sportController.get(req, res);
});

router.post('/sport/:sportId', async (req, res) => {
	sportController.update(req, res);
});

router.post('/sports', async (req, res) => {
	sportController.create(req, res);
});

router.get('/sport/delete/:sportId', async (req, res) => {
	sportController.delete(req, res);
});

router.post('/sports/athletes/add', async (req, res) => {
	sportController.addAthlete(req, res);
});

router.get('/sports/:sportId/athletes/:athleteId', async (req, res) => {
	sportController.removeAthlete(req, res);
});
module.exports = router;