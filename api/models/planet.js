const mongoose = require('mongoose');

const planetSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    climate: { type: String, required: true },
    terrain: { type: String, required: true },
    qtFilms: { type: Number, required: true }
});

module.exports = mongoose.model('Planet', planetSchema);