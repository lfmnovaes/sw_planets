const mongoose = require('mongoose');

const planetSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    climate: { type: String, required: true },
    terrain: { type: String, required: true },
    qttFilm: { type: Number, required: true , default: 0 }
});

module.exports = mongoose.model('Planet', planetSchema);