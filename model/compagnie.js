const mongoose = require('mongoose')
const uniqueValidate = require('mongoose-unique-validator');

const compagnie = mongoose.Schema({
    compagnie: {type:String, required:true},
    numero: {type: String,required: true },
    email: {type: String, required:true},
    logo: {type: String, required:true},
    commune: {type: String, required: true},
    degret: {type: String, required: true},
    password: {type:String,required:true}
},
{
    timesTamps: true
})

compagnie.plugin(uniqueValidate)
module.exports = mongoose.model('Compagnie', compagnie)