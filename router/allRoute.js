const express = require('express')
const Route = express.Router();
const compagnie = require('../controller/compagnie');
const commercant = require('../controller/commercant');
const multer = require('../middleware/multer');
const Auth = require('../middleware/auth')

Route.post('/compagnieCreate/',multer,compagnie.create)
Route.post('/compagnieLogin/',compagnie.login);
Route.put('/compagnieUpdate/:id',compagnie.update);
Route.post('/compagnieVerifyByEmail/',compagnie.verifByEmail);
Route.delete('/compagniedelete/:id',compagnie.delete);
Route.get('/compagnieReadAll/',compagnie.readAll);
Route.get('/compagnieReadId/:id',compagnie.readId);
// Route.get('/compagniereadById/:id',compagnie)
// <.....comercant API .....>
Route.post('/commercantcreate/',multer,commercant.create);
Route.get('/commercantReadById/:id',Auth,commercant.readeById);
Route.post('/commercantLogin/',commercant.login);
Route.put('/commercantUpdate/',commercant.update);
Route.delete('/commercantdelete/:id',commercant.delete);
Route.get('/',commercant.readAll);



module.exports = Route
