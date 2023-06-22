const mongoose = require('mongoose')
const compagnie = require('../model/compagnie')
const uniqueValidate = require('mongoose-unique-validator')

const Publication = mongoose.Schema({
    matricule :{type: String,required: true},
    nomPrenomchauff:{type:String, required: true},
    numeroChauff: {type:String, required: true},
    numeroCNI:{type:String, required: true},
    ligneDepart: {type:String, required: true},
    ligneArrive: {type:String, required: true},
    heureDepart: {type:String, required: true},
    espace:{type:String, required: true},
    statut: {type: Number, default: 0},
    espaceRestant: {type:Number, required:true},
    compagnie: {type: mongoose.Schema.Types.ObjectId, ref:compagnie}
},
{
    timesTamps: true
})

Publication.plugin(uniqueValidate);
module.exports = mongoose.model("Publication", Publication );