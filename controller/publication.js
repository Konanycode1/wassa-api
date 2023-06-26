const Publici = require('../model/publication')
const Compagnie = require('../model/compagnie')
const publication = require('../model/publication')
const compagnie = require('../model/compagnie')

class Publication {
    static async create(req,res){
        if( req.body.numeroChauff.length != 10){
            res.status(400).json({msg: "Numéro incorrecte"})
            return
        }
        Compagnie.findById(req.auth.userId)
        .then((data)=>{
            if(!data){
                res.status(400).json({msg: "Compte introuvable"})
                return
            }
            let pub = new Publici({
                ...req.body,
                espaceRestant: req.body.espace.split(" ")[0],
                compagnie: data._id
            })
            pub.save()
            .then((valid)=> {
                if(valid){
                    res.status(200).json({msg:"Publication éffectuée avec succès"})
                }
                else{
                    res.status(400).json({msg:"Publication échouée"})
                }
            })
            .catch((error)=> res.status(400).json({error: error.message}))
        })
        .catch((error)=> res.status(400).json({error: error.message}))
    }
    static async update(req,res){
        
        Compagnie.findById(req.auth.userId)
        .then((data)=>{
            if(!data){
                res.status(404).json({msg: "Compte introuvable"})
                return
            }
            publication.findById(req.params.id)
            .then((pub)=>{
                if(!pub){
                    res.status(404).json({msg:"Publication introuvable"})
                    return
                }
                let pubi = {
                    ...req.body,
                    compagnie: data._id
                }
                publication.updateOne({_id:pub._id}, {...pubi, _id: pub._id})
                .then((valid)=> {
                    if(!valid){
                        res.status(400).json({msg: "Modification échouée"})
                        return
                    }
                    res.status(201).json({msg: "Modification effectuée avec succès"})
                })
                .catch((error)=> res.status(400).json({error: error.message}))
            })
            .catch((error)=>res.status(400).json({error: error.message}))
        })
        .catch((error)=> res.status(400).json({error: error.message}))

    }
    static async read(req,res){
        publication.find()
        .then((data)=> res.status(200).json({data}))
        .catch((error)=> res.status(400).json({error: error.message}))
    }
    static async readId(req,res){
        publication.findById(req.params.id)
        .then((data)=> res.status(200).json({data}))
        .catch((error)=> res.status(400).json({error: error.message}))
    }
    static async terminer(req, res){
        Compagnie.findById(req.auth.userId)
        .then((comp)=>{
            if(!comp){
                res.status(404).json({msg: "Compagnie introuvable"})
            }
            publication.findone({_id: req.params.id})
            .then((publ)=>{
                if(!publ){
                    res.status(404).json({msg: "Publication introuvable"})
                }
                let sta ={
                    statut: 1

                }
                publication.updateOne({_id: publ._id}, {...sta,_id: publ._id})
                .then(()=>{
                    res.status(201).json({msg: "Arrivage"})
                })
                .catch((error)=> res.status(404).json({error: error.message}))
            })
            .catch((error)=> res.status(404).json({error: error.message}))
        })
        .catch((error)=> res.status(500).json({error: error.message}))
    }
    static async readPubCom(req,res){
        try {
            compagnie.findById(req.auth.userId)
            .then((comp)=>{
                if(!comp){
                    res.status(404).json({msg: "Compagnie introuvable"})
                    return
                }
                publication.find({compagnie: comp._id})
                .then((data)=> res.status(201).json(data))
                .catch((error)=>res.status(400).json({error: error.message}))
            })
            .catch((error)=> res.status(400).json({error: error.message}))
        } catch (error) {
            res.status(500).json({error: error.message})
        }

    }
    static async delete(req,res){
        compagnie.findById(req.auth.userId)
        .then((valus)=> {
            if(!valus){
                res.status(404).json({msg: "Compte introuvable !!"});
                return
            }
            publication.deleteOne({_id:req.params.id})
            .then(()=> res.status(200).json({msg: "Publication supprimée"}))
            .catch((error)=> res.status(400).json({error: error.message}))
        })
        .catch((error)=> res.status(400).json({error: error.message}))   
    }

}
module.exports = Publication