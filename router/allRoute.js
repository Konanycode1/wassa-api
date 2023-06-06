const express = require('express')
const Route = express.Router();
const compagnie = require('../controller/compagnie');
const commercant = require('../controller/commercant');
const multer = require('../middleware/multer');
const Auth = require('../middleware/auth')

Route.post('/compagnieCreate/',multer,compagnie.create)
Route.get('/compagniereadById/:id',compagnie)
// <.....comercant API .....>
Route.post('/commercantcreate/',multer,commercant.create);
Route.get('/commercantReadById/:id',Auth,commercant.readeById);
Route.post('/commercantLogin/',commercant.login);
Route.put('/commercantUpdate/',commercant.update);
Route.delete('/commercantdelete/:id',commercant.delete);
Route.get('/commercantreadAll/',commercant.readAll);



module.exports = Route
