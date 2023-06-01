const compagnie = require('../model/compagnie')

class Compagnie {
    static async create(req,res){
        try {
            compagnie.create({...req.body})
            .then(()=> console.log("ok"))
            .catch((error)=> res.status(400).json({error: error.message}))
            
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

module.exports = Compagnie;