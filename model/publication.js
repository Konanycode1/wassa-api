const mongoose = require('mongoose')
const compagnie = required('../model/compagnie')
const uniqueValidate = require('mongoose-unique-validator')

const Publication = mongoose.Schema({
    matricule :{type: String,required: true},
    nomPrenom_chauff :{type:String, required: true},
    numero_Chauff: {type:String, required: true},
    ligneDepart: {type:String, required: true},
    ligneArrive: {type:String, required: true},
    compagnie: {type: mongoose.Schema.Types.ObjectId, ref:compagnie}
},
{
    timesTamps: true
})

Publication.plugin(uniqueValidate);
module.exports = mongoose.model("Publication", Publication );