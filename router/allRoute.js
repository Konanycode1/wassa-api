const express = require('express')
const Route = express.Router();
const compagnie = require('../controller/compagnie');
const commercant = require('../controller/commercant');
const publication = require('../controller/publication');
const commander = require('../controller/commande');
const multer = require('../middleware/multer');
const Auth = require('../middleware/auth')
// <.....compagnie API .....> 
Route.post('/compagnieCreate/',multer,compagnie.create)
Route.post('/compagnieLogin/',compagnie.login);
Route.put('/compagnieUpdate/:id',compagnie.update);
Route.post('/compagnieVerifyByEmail/',compagnie.verifByEmail);
Route.delete('/compagniedelete/:id',compagnie.delete);
Route.get('/compagnieReadAll/',compagnie.readAll);
Route.get('/compagnieReadId/:id',Auth,compagnie.readId);
// Route.get('/compagniereadById/:id',compagnie)
// <.....comercant API .....>
Route.post('/commercantcreate/',multer,commercant.create);
Route.get('/commercantReadById/:id',Auth,commercant.readeById);
Route.post('/commercantLogin/',commercant.login);
Route.put('/commercantUpdate/',commercant.update);
Route.delete('/commercantdelete/:id',commercant.delete);
Route.get('/',commercant.readAll);
// <.....publication API .....>
Route.post('/publication/',Auth,publication.create);
Route.put('/updatePub/:id',Auth,publication.update);
Route.get('/readidPub/:id',Auth,publication.readId);
Route.get('/readAllPub/',publication.read);
Route.get('/deletePub/:id',Auth,publication.delete);
// <.....Commande de la pub API .....>
Route.post('/commande/:id',Auth,commander.commander)
Route.get('/valider/:id',Auth,commander.valide)
Route.get('/annuler/:id',Auth,commander.annuler)
Route.get('/annulerByCom/:id',Auth,commander.annulerCommercant)
Route.get('/allCommande/',commander.allCommande)
Route.get('/CommandeById/:id',commander.commandeId)

module.exports = Route
