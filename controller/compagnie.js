const compagnie = require('../model/compagnie')
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');

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
                    
                    if(req.body.numero.length != 10){
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
                            let compagn = new compagnie({
                                compagnie:req.body.compagnie,
                                numero: req.body.numero,
                                email: req.body.email,
                                logo: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
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
                            .catch((error)=>{res.status(400).json({error: error.message})})  
                        })
                        .catch((error)=>{res.status(400).json({error:error.message})})
                    }
                }
            })
            .catch((error)=> res.status(400).json({error: error.message}))
            
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
    static async login(req,res){
        try {
            compagnie.findOne({email:req.body.email})
            .then((data)=>{
                if(!data){
                    res.status(400).json({msg:"Email introuvable"})
                    return
                }
                bcrypt.compare(req.body.password, data.password)
                .then((com)=>{
                    if(!com){
                        res.status(400).json({msg: "Mot de passe incorrect"})
                        return
                    }
                    else{
                        res.status(201).json({
                            userId:data._id,
                            status: "compagnie",
                            token: jwt.sign({userId: data._id}, "RANDOM_TOKEN_KEY")
                        })
                    }

                })
                .catch((error)=> error.message)
            })
            .catch((error)=> res.status(400).json({error: error.message}))
        } catch (error) {
            res.status(500).json({error: error.message})
        }
        
    }
    static async update(req,res){
        try {
            compagnie.findById(req.params.id)
            .then((data)=>{
                if(!data){
                    res.status(404).json({msg: "Compte introuvable"})
                    return
                }
                if(req.body.password){
                    bcrypt.hash(req.body.password,10)
                    .then((hash)=>{
                        let wassaObjet = req.body.logo ? {...req.body,logo:`${req.protocol}://${req.get('host')}/images/${req.body.logo}`,password: hash}:
                        {...req.body}
                        compagnie.updateOne({_id: req.params.id}, {...wassaObjet, _id: req.params.id})
                        .then((valid)=>{
                            if(!valid){
                                res.status(400).json({msg: "Compte non modifié"})
                                return
                            }
                            res.status(201).json({msg: "Compte modifié avec succès"})
                        })
                        .catch((error)=> res.status(400).json({error: error.message}))

                    })
                    .catch((error)=> res.status(400).json({error: error.message}))  
                }
                else{
                    let wassaObjet = req.body.logo ? {...req.body,logo:`${req.protocol}://${req.get('host')}/images/${req.body.logo}`}:
                        {...req.body}
                        compagnie.updateOne({_id: req.params.id}, {...wassaObjet, _id: req.params.id})
                        .then((valid)=>{
                            if(!valid){
                                res.status(400).json({msg: "Compte non modifié"})
                                return
                            }
                            res.status(201).json({msg: "Compte modifié avec succès"})
                        })
                        .catch((error)=> res.status(400).json({error: error.message}))
                }
            })
            .catch((error)=> res.status(400).json({error: error.message}))
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
    static async verifByEmail(req,res){
        compagnie.findOne({email: req.body.email})
        .then((data)=>{
            if(!data){
                res.status(400).json({msg: "Email incorrect !!"})
                return
            }
            else return res.status(201).json({data})
            
        })
        .catch((error)=> res.status(400).json({error: error.message}))
    }
    static async delete(req,res){
        compagnie.findById(req.params.id)
        .then((data)=>{
            if(!data){
                res.status(400).json({msg: "Compte introuvable"})
                return
            }
            compagnie.deleteOne({_id: data._id})
            .then((dele)=> {
                if(dele){
                    res.status(201).json({msg: "Compte supprimés"})
                    return
                }
                else{
                    res.status(201).json({msg: "Compte Non  supprimés"})
                }
            } )
            .catch((error)=> res.status(400).json({error:error.message}))
        })
        .catch((error)=> res.status(400).json({error: error.message}))
    }
    static async readAll(req,res){
        compagnie.find()
        .then((data)=> res.status(200).json({data}))
        .catch((error)=> res.status(400).json({error:error.message}))
    }
    static async readId(req,res){
        compagnie.findById(req.params.id)
        .then((data)=> res.status(200).json({data}))
        .catch((error)=> res.status(400).json({error:error.message}))
    }
}

module.exports = Compagnie;