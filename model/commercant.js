const mongoose = require('mongoose');
const uniqueValidate = require('mongoose-unique-validator')

const Commercant = mongoose.Schema({
    nom: {type:String, required: true},
    prenom: {type:String, required: true},
    numero: {type: String, required: true},
    numeroCNI: {type:String, required: true},
    email: {type: String, required: true},
    profession: {type: String, required: true}
},
{
    timesTamps: true
})
Commercant.plugin(uniqueValidate)
module.exports = mongoose.model('Commercant', Commercant);