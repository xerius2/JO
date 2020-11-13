const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// le schéma structure le document que l'on va utiliser sur notre projet
// on y définit les champs et les types !!
const athleteSchema = new Schema({
    firstName: String,
    lastName: String,
    gender: String,
    country: String,
    });

// on créé un model de notre athlete (attention la collection doit être égal au nom de notre model au pluriel !!)
module.exports = mongoose.model('athlete', athleteSchema);