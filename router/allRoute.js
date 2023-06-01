const express = require('express')
const router = express.Router();

const compagnie = require('../model/compagnie');
const commercant = require('../model/commercant')

router.post('/create/', compagnie.create)
router.post('/create/', commercant.create)
module.exports = router