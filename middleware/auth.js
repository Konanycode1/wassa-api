const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    try {
        let token = req.headers.authorization.split(" ")[1]
        let decodeToken = jwt.verify(token,"RANDOM_TOKEN_KEY")
        let userId = decodeToken.userId
        
        req.auth ={
            userId: userId,
            status: decodeToken.status
        }
        next() 
    } catch (error) {
        res.status(500).json({error: error.message})
        
    }
}