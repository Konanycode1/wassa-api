const express = require('express')
// const mongoose = require('mongoose');
const mongoose = require('mongoose')
const cors = require('cors');
const Router = require('./router/allRoute')
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

mongoose.connect("mongodb+srv://wassa:wassa@cluster0.vpf0ijy.mongodb.net/?retryWrites=true&w=majority",
{ useNewUrlParser: true,useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

app.use('/api', Router);
 
let port = process.env.PORT || 3000
app.listen(port, ()=>{ console.log(`server lancé port ${port} à pour lien : http://localhost:${port}`)})