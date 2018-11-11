const mongoose = require('mongoose');

const planetSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    climate: String,
    terrain: String,
    qtFilms: Number
});

module.exports = mongoose.model('Planet', planetSchema);