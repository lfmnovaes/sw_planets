const Planet = require('../models/planet');
const mongoose = require('mongoose');
const request = require('then-request');

exports.planets_get_all = (req, res, next) => {
    Planet.find()
        .select('_id name climate terrain qtFilms')    
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                planets: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        climate: doc.climate,
                        terrain: doc.terrain,
                        qtFilms: doc.qtFilms,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/planets/' + doc._id
                        }
                    }
                })
            };
            // if (docs.length >= 0) {
                res.status(200).json(response);
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
};

exports.planets_create_planet = (req, res, next) => {
    var films;
    var planet;

    // Synchonous method tentative
    
    request('GET', 'https://swapi.co/api/planets/?search=' + req.body.name).then((res) => {
        films = JSON.parse(res.getBody().toString()).results[0].films.length;
        //console.log('first ' + films);
    }).done(planet = new Planet({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            climate: req.body.climate,
            terrain: req.body.terrain,
            qtFilms: films
        })
    );
    //console.log('and then ' + films);

    // Saving in the database using mongoose and throwing any error if found one

    planet.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Planet created successfully!',
                createdPlanet: {
                    _id: result._id,
                    name: result.name,
                    climate: result.climate,
                    terrain: result.terrain,
                    qtFilms: result.qtFilms,
                    request: {
                        type: 'POST',
                        url: 'http://localhost:3000/planets/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.planets_get_planet = (req, res, next) => {
    const id = req.params.planetId;
    Planet.findById(id)
        .select('_id name climate terrain qtFilms')
        .exec()
        .then(doc => {
            console.log("From DB", doc);
            if (doc) {
                res.status(200).json({
                    planet: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/planets/'
                    }
                });
            } else {
                res.status(404).json({message: 'No valid entry found for provided ID'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
};

exports.planets_update_planet = (req, res, next) => {
    const id = req.params.planetId;

    // Loop to change just the field we want

    const updateOps = {};
    for (const key of Object.keys(req.body)) {
        updateOps[key] = req.body[key];
    }

    Planet.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Planet updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/planets/' + id
                }
            });
        })
        .catch(err => {
            console.log(500).json({
                error: err
            });
        });
};

exports.planets_delete_planet = (req, res, next) => {
    const id = req.params.planetId;
    //Planet.findOneAndDelete(id)
    Planet.find({ _id: id })
    .remove()
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Planet deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/planets/',
                body: { name: 'String', climate: 'String', terrain: 'String', qtFilms: 'Number' }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};