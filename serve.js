const express = require('express')
// const mongoose = require('mongoose');
const mongoose = require('mongoose')
const cors = require('cors');
const Router = require('./router/allRoute')
const path = require('path');
// import { fileURLToPath } from 'url';
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
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
app.use('/images', express.static(path.join(__dirname, 'images')));
 
let port = process.env.PORT || 3000
app.listen(port, ()=>{ console.log(`server lancé port ${port} à pour lien : http://localhost:${port}`)})