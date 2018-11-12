const express = require('express');
const router = express.Router();

const PlanetsController = require('../controllers/planets');

const Planet = require('../models/planet');

router.get('/', PlanetsController.planets_get_all);

router.post('/', PlanetsController.planets_create_planet);

router.get('/:planetId', PlanetsController.planets_get_planet);

router.patch('/:planetId', PlanetsController.planets_update_planet);

router.delete('/:planetId', PlanetsController.planets_delete_planet);

module.exports = router;