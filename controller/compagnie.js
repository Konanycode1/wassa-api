const compagnie = require('../model/compagnie')
const bcrypt = require('bcrypt')

class Compagnie {
    static async create(req,res){
        try {
            compagnie.findOne({email:req.body.email})
            .then((data)=>{
                if(data){                                                                                                                            
                    res.status(400).json({msg: "La compagnie existe déjà"})
                    return
                }
                else{
                    if(req.body.numero.length < 10){
                        res.status(400).json({msg: "Contact trop court !!"})
                        return
                    }
                    else if(req.body.numero.length >10 || req.body.numero.length < 10){
                        res.status(400).json({msg: "Ceci n'est pas un numéro de la CI !!"})
                        return
                    }
                    else if( req.body.password.length < 4){
                        res.status(400).json({msg: "Mot de passe trop court !!"})
                        return
                    }
                    else{
                        bcrypt.hash(req.body.password,10)
                        .then((hash)=> {
                            if(!hash){
                                return
                            }
                            console.log(req.body.logo)
                            let compagn = new compagnie({
                                compagnie:req.body.compagnie,
                                numero: req.body.numero,
                                email: req.body.email,
                                logo: `${req.protocol}://${req.get('host')}/images/${req.body.logo}`,
                                commune: req.body.commune,
                                degret: req.body.degret,
                                password: hash
                            })
                            compagn.save()
                            .then((comp)=> {
                                if(comp){
                                    res.status(200).json({msg: "Votre compagnie à été enrégistré veuillez vous connectez pour accéder à votre espace"})
                                }
                                else{
                                    res.status(400).json({msg: "Inscription échouée😡😡"})
                                }
                            })
                            .catch((error)=>{ 
                                res.status(400).json({error: error.message})})  

                        })
                        .catch((error)=>{
                           
                         res.status(400).json({error:error.message})})
                    }
                }
            })
            .catch((error)=> res.status(400).json({error: error.message}))
            
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

module.exports = Compagnie;