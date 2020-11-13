const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// le schéma structure le document que l'on va utiliser sur notre projet
// on y définit les champs et les types !!
const sportSchema = new Schema({
    name: String,
    athletes : [{ type: Schema.Types.ObjectId, ref: 'Athlete' }]
    });

// on créé un model de notre sport (attention la collection doit être égal au nom de notre model au pluriel !!)
module.exports = mongoose.model('sport', sportSchema);