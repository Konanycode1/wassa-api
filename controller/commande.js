const commande = require('../model/commande');
const Publication = require('../model/publication');
const Compagnie = require('../model/compagnie');
const Commercant = require('../model/commercant');
const auth = require('../middleware/auth');

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

                    console.log(req.body.nombreProduit, pub.espace.split(" ")[0])
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
                
                let espaceDis = pub.espace.split(" ")[0]
                let espaceR = {
                    espaceRestant:`${espaceDis - cmd.nombreProduit.split(" ")[0]}`
                }
                console.log(espaceR.espaceRestant)

            })
            .catch((error)=> res.status(400).json({error: error.message}))
        })
        .catch((error)=> res.status(400).json({error: error.message}))
    }
}
module.exports = Commande