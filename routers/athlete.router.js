const express = require('express');
const router = express.Router();

const AthleteController = require('../Controllers/athlete.controller');
const athleteController = new AthleteController();

//Récupèrer la liste des athlètes.
router.get('/athletes', async (req, res) => {
	athleteController.list(req, res);
});

//Consulter un athlète en particulier.
router.get('/athletes/:athleteId', async (req, res) => {
	athleteController.get(req, res);
});

//Récupérer la liste des sports auquel un athlète est rattaché.
router.get('/athletes/:athleteId/sports', async (req, res) => {
	athleteController.getSports(req, res);
});

//Mettre à jour un athlète.
router.post('/athletes/:athleteId', async (req, res) => {
	athleteController.update(req, res);
	res.redirect('/athletes');
});

//Créer un athlète.
router.post('/athletes/:athleteId', async (req, res) => {
	athleteController.create(req, res);
	res.redirect('/athletes');
});

//Supprimer un athlète.
router.get('/athletes/delete/:athleteId', async (req, res) => {
	athleteController.delete(req, res);
	res.redirect('/athletes');
});

module.exports = router;