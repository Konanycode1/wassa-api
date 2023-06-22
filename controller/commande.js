const commande = require('../model/commande');
const Publication = require('../model/publication');
const Compagnie = require('../model/compagnie');
const Commercant = require('../model/commercant');
const auth = require('../middleware/auth');
const compagnie = require('../model/compagnie');

class Commande {
    static async commander(req,res){
        Commercant.findById(req.auth.userId)
        .then((commerce) => {
            if(!commerce){
                res.status(404).json({msg: "Compte introuvable"})
                return 
            }
            Publication.findById(req.params.id)
            .then((pub)=>{
                if(!pub){
                    res.status(404).json({msg: "Publication introuvable"})
                    return 
                }
                else{
                    if( parseInt(req.body.nombreProduit ) > pub.espace.split(" ")[0] ){
                        res.status(400).json({msg: "Espace inssuffisant"})
                        return  
                    }
                    let comm = commande({
                        ...req.body,
                        idClient: commerce._id,
                        idPub: pub._id,
                        idCompa: pub.compagnie
                    })
                    comm.save()
                    .then((data)=>{
                        if(!data){
                            res.status(400).json({msg: "Commande échouée !!"});
                            return
                        }
                        res.status(200).json({msg: "Commande en cours"})
                    })
                    .catch((error)=> res.status(400).json({error:error.message}))
                }
                

            })
            .catch((error)=> res.status(400).json({error: error.message}))


        })
        .catch((error)=> res.status(400).json({error: error.message}))
    }
    static async valide(req,res){
        try {
            Compagnie.findById(req.auth.userId)
            .then((compagnie)=>{
                if(!compagnie){
                    res.status(404).json({msg: "Compagnie introuvable !!!"});
                    return
                }
                commande.findById(req.params.id)
                .then((cmd)=>{
                    if(!cmd){
                        res.status(404).json({msg: "Commande introuvable"});
                        return
                    }
                    Publication.findOne({_id: cmd.idPub })
                    .then((pub)=>{
                        if(!pub){
                            res.status(404).json({msg: "Publication introuvable"});
                            return
                        }
                        else if( pub.espace.split(' ')[0] == 0){
                            res.status(404).json({msg: "Pas d'espace disponible"})
                        }
                        else{
                            let espaceDis = pub.espace.split(" ")[0]
                            let espaceR = {
                                espaceRestant:`${espaceDis-cmd.nombreProduit.split(" ")[0]<=0?0:espaceDis-cmd.nombreProduit.split(" ")[0]}`
                            }
                            Publication.updateOne({_id: pub._id},{...espaceR,_id: pub._id})
                            .then((valid)=>{
                                if(!valid){
                                    res.status(400).json({msg: "Commande échouée"});
                                    return
                                }
                                let commando = {
                                    status:1
                                }
                                commande.updateOne({_id:cmd._id}, {...commando, _id:cmd._id})
                                .then(()=>res.status(201).json({msg: "Commande validée"}))
                                .catch((error)=> res.status(400).json({error: error.message}))
                            })
                            .catch((error)=> res.status(400).json({error: error.messsage}))
                        }
                       
                    })
                    .catch((error)=> res.status(400).json({error: error.message}))
                })
                .catch((error)=> res.status(400).json({error: error.message}))
            })
            .catch((error)=> res.status(400).json({error: error.message}))
            
        } catch (error) {
            res.status(500).json({error: error.message})
        }   
    }
    static async annuler(req,res){
        try {
            Compagnie.findById(req.auth.userId)
            .then((comp)=>{
                if(!comp){
                    res.status(400).json({msg: "Compagnie introuvable"})
                    return
                }
                commande.findById(req.params.id)
                .then((command)=> {
                    if(!command){
                        res.status(400).json({msg: "Commande introuvable !!"});
                        return 
                    }
                    let com = {
                        status: -1
                    }
                    commande.updateOne({_id:command._id}, {...com, _id:command._id})
                    .then((valid)=> {
                        if(valid){
                            res.status(200).json({msg: "Commande annulée"})
                        }
                        else{
                            res.status(400).json({msg: "Commande non annulée"})
                        }
                    })
                    .catch((error)=> res.status(400).json({error:error.message}))
                })
                .catch((error)=> res.status(400).json({error:error.message}))
            })
            .catch((error)=> res.status(400).json({error: error.message}))
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
    static async annulerCommercant(req,res){
        try {
            Commercant.findById(req.auth.userId)
            .then((comm)=>{
                if(!comm){
                    res.status(400).json({msg: "Compagnie introuvable"})
                    return
                }
                commande.findById(req.params.id)
                .then((command)=> {
                    if(!command){
                        res.status(400).json({msg: "Commande introuvable !!"});
                        return 
                    }
                    let com = {
                        status: -1
                    }
                    commande.updateOne({_id:command._id}, {...com, _id:command._id})
                    .then((valid)=> {
                        if(valid){
                            res.status(200).json({msg: "Commande annulée"})
                        }
                        else{
                            res.status(400).json({msg: "Commande non annulée"})
                        }
                    })
                    .catch((error)=> res.status(400).json({error:error.message}))
                })
                .catch((error)=> res.status(400).json({error:error.message}))
            })
            .catch((error)=> res.status(400).json({error: error.message}))
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
    static async allCommande(req, res){
        try {
            commande.find()
            .then((commande)=> res.status(201).json({commande}))
            .catch((error)=> res.status(400).json({error:error.message}))
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }
    static async commandeId(req,res){
        commande.findById(req.params.id)
        .then((commande)=>{
            if(!commande){
                res.status(400).json({msg: "La commande n'existe pass"})
                return
            }
            res.status(200).json({commande})
        })
        .catch((error)=> res.status(400).json({error: error.message}))
    }
}
module.exports = Commande