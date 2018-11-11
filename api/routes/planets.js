const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Planet = require('../models/planet');

router.get('/', (req, res, next) => {
    Planet.find()
    .exec()
    .then(docs => {
        console.log(docs);
        // if (docs.length >= 0) {
            res.status(200).json(docs);
        // } else {
        //     res.status(404).json({
        //         message: 'No entries found'
        //     });
        // }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {
    const planet = new Planet({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        climate: req.body.climate,
        terrain: req.body.terrain,
        qtFilms: req.body.qtFilms
    });
    
    // Saving in the database using mongoose and throwing any error if found one

    planet.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'POST request to /planets',
                createdPlanet: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:planetId', (req, res, next) => {
    const id = req.params.planetId;
    Planet.findById(id)
        .exec()
        .then(doc => {
            console.log("From DB", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: 'No valid entry found for provided ID'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.patch('/:planetId', (req, res, next) => {
    const id = req.params.PlanetId;

    // If we wanna change not all the object

    const updateOps = {};
    for (const key of Object.keys(req.body)) {
        updateOps[key] = req.body[key];
    }
    Planet.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log (result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(500).json({
                error: err
            });
        });
});

router.delete('/:planetId', (req, res, next) => {
    const id = req.params.PlanetId;
    //Planet.findOneAndDelete(id)
    Planet.deleteOne({ _id: id })
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;