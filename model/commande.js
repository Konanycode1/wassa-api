const mongoose = require('mongoose')
const uniqueValidate = require('mongoose-unique-validator');
const commercant = require('./commercant');
const publication = require('./publication')
const Compagnie = require('./compagnie');
const compagnie = require('./compagnie');

const Commande = mongoose.Schema({
    nombreProduit: {type:String, requered: true},
    numeroExp: {type:String, requered: true},
    nomPrenomExp: {type:String, requered: true},
    destination: {type:String, required:true},
    status: {type:Number, default: 0, required: true},
    idClient: {type: mongoose.Schema.Types.ObjectId, ref:commercant},
    idPub : {type: mongoose.Schema.Types.ObjectId, ref:publication},
    idCompa : {type: mongoose.Schema.Types.ObjectId, ref:compagnie}
},
{
    timesTamps: true
})
Commande.plugin(uniqueValidate);
module.exports = mongoose.model("Commande",Commande);