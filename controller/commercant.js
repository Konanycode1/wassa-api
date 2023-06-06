const commercant = require('../model/commercant')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class Commercants{
    static async create(req,res){
        try {
            Commercant.findOne({email: req.body.email})
            .then((data)=> {
                if(data){
                    res.status(400).json({msg: "Compte existe déjà veuillez vous connecter"})
                    return                }
                else{
                    if(req.body.numero.length < 10 || req.body.numero.length > 10 ){
                        res.status(4000).json({msg: "Numéro incorrecte "})
                        return 
                    }
                    else{
                        if(req.body.password.length <4){
                            res.status(400).json({msg: "mot de pase trop court"})
                            return 
                        }
                        bcrypt.hash(req.body.password, 10)
                        .then((hash)=>{
                            if(hash){
                                let commerce = new Commercant({
                                    ...req.body,
                                    logo: `${req.protocol}://${req.get('host')}/images/${req.body.logo}`,
                                    password: hash
                                })
                                commerce.save()
                                .then((data)=>{
                                    if(!data){
                                        res.status(300).json({msg: "Enrégistrement non effectués"});
                                        return 
                                    }
                                    res.status(200).json({msg: "Enregistrement effectués"})

                                })
                                .catch((error)=> res.status(400).json({error:error.message}))
                            }
                            else return res.status(400).json({msg: "cryptage echoué"})
                        })
                        .catch((error)=> res.status(404).json({error: error.message}))
                    
                    }
                }
            })
            .catch((error)=> res.status(400).json({error}))
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
    static async login(req,res){
       try {
        commercant.findOne({numero: req.body.numero})
        .then((data)=>{
            if(!data){
                res.status(404).json({msg: "Compte instrouvable !!!"})
                return
            }
            bcrypt.compare(req.body.password, data.password)
            .then((compar)=>{
                if(!compar){
                    res.status(400).json({msg:"Mot de passe incorrect"})
                    return
                }
                res.status(201).json({
                    userId: data._id,
                    status: "shopkeeper",
                    token:jwt.sign({userId: data._id},"RANDOM_TOKEN_KEY",{expiresIn: 3600*24})
                })
            })
            .catch((error)=> res.status(400).json({error: error.message}))
        })
        .catch((error)=> res.status(400).json({error: error.message}))
        
       } catch (error) {
        res.status(500).json({error: error.message})
       }
    }
    static async readeById (req,res){
        try {
            commercant.findById(req.params.id)
            .then((data)=>{
                if(!data){
                    res.status(404).json({msg: "Compte introuvable !!"})
                    return
                }
                res.status(201).json({data})
            })
            .catch((error)=> res.status(400).json({error: error.message}))
            
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }
    static async update(req,res,next){
        if(req.body.password){
            
            bcrypt.hash(req.body.password,10)
            .then((hash)=>{
                let wassaObject = req.body.logo? {...req.body,
                    logo: `${req.protocol}://${req.get('host')}/images/${req.body.logo}`,
                    password: hash
                }:{ ...req.body,password:hash}
                commercant.findOne({email: req.body.email})
                .then((com)=>{
                    if(!com){
                        res.status(400).json({msg: "Comptes introuvable !!"})
                        return 
                    }
                    commercant.updateOne({_id:com._id},{...wassaObject, _id: com._id})
                    .then((valid)=>{
                        if(!valid){
                            res.status(400).json({msg:"Modification échouée"})
                            return
                        }
                        res.status(200).json({msg: "Modification effectuée avec succès"})
                    })
                    .catch((error)=> res.status(400).json({error: error.message}))
                })
                .catch((error)=> res.status(400).json({error: error.message}))

            })
            .catch((error)=> res.status(400).json({error: error.message}))
        }
        else{
            let wassaObject = req.body.logo?{...req.body,
                logo: `${req.protocol}://${req.get('host')}/images/${req.body.logo}`
            }:{ ...req.body}
            console.log(wassaObject.logo)
            commercant.findOne({email: req.body.email})
            .then((com)=>{
                if(!com){
                    res.status(400).json({msg: "Comptes introuvable !!"})
                    return 
                }
                commercant.updateOne({_id:com._id},{...wassaObject, _id: com._id})
                .then((valid)=>{
                    if(!valid){
                        res.status(400).json({msg:"Modification échouée"})
                        return
                    }
                    res.status(200).json({msg: "Modification effectuée avec succès"})
                })
                .catch((error)=> res.status(400).json({error: error.message}))
            })
            .catch((error)=> res.status(400).json({error: error.message}))
        }
        
    }
    static async delete(req, res){
        try {
            commercant.findOne({_id: req.params.id})
            .then((data)=>{
                if(!data){
                    res.status(400).json({msg: "Cet compte est introuvable"})
                    return
                }
                commercant.deleteOne({_id:data._id})
                .then((com)=>{
                    if(!com){
                        res.status(400).json({msg: "Compte Non supprimé"})
                        return
                    }
                    else{
                        res.status(400).json({msg: "Compte supprimés"})
                    }
                })
                .catch((error)=> res.status(400).json({error: error.message}))
            })
            .catch((error)=> res.status(404).json({error: error.message}))
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
    static async readAll(req,res){
        try {
            commercant.find()
            .then((com)=>{
                if(!com){
                    res.status(400).json({msg: "Compte introuvable !!"})
                    return
                }
                else{
                    res.status(201).json({com})
                }
            })
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

module.exports = Commercants;