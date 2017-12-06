var express = require('express');
var router = express.Router();
//var usuario = require('../models/usuario');
var EtniaController = require('../controllers/etniaController');

/* GET users listing. */
router.get('/',EtniaController.getAllEtnias);
router.get('/:id?', EtniaController.getEtniaById);
router.get('/Riesgo/:id?', EtniaController.getEtniaByRiesgo);

/* POST users */
router.post('/',EtniaController.addEtnia);

/*DELETE users*/
router.delete('/:id?', EtniaController.deleteEtnia);
/*UPDAATE users*/
router.put('/:id', EtniaController.updateEtnia);


module.exports = router;
