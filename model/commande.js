const mongoose = require('mongoose')
const uniqueValidate = require('mongoose-unique-validator');
const commercant = require('../model/commercant');
const publication = require('../model/publication')

const Commande = mongoose.Schema({
    nombreProduit: {type:String, requered: true},
    destination: {type:String, required:true},
    idClient: {type: mongoose.Schema.Types.ObjectId, ref:commercant},
    idPub : {type: mongoose.Schema.Types.ObjectId, ref:publication},
    status: {type:Number, default: 1, required: true},
},
{
    timesTamps: true
})
Commande.plugin(uniqueValidate);
module.exports = mongoose.model("Commande",Commande);