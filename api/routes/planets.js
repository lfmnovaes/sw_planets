const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET request to /planets'
    });
});

router.post('/', (req, res, next) => {
    const planet = {
        name: req.body.name,
        climate: req.body.climate,
        terrain: req.body.terrain
    };
    res.status(201).json({
        message: 'POST request to /planets',
        createdPlanet: planet
    });
});

router.get('/:planetId', (req, res, next) => {
    const id = req.params.planetId;
    if (id === 'special') {
        res.status(200).json({
            message: 'Special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'Normal ID'
        });
    }
});

router.patch('/:planetId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated planet!'
    });
});

router.delete('/:planetId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted planet!'
    });
});

module.exports = router;