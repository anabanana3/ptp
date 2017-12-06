var express = require('express');
var router = express.Router();
//var usuario = require('../models/usuario');
var MutilacionController = require('../controllers/mutilacionController');

/* GET users listing. */
router.get('/',MutilacionController.getAllMutilaciones);
router.get('/:id?', MutilacionController.getMutilacionById);
//router.get('/nombre=:?', UsuarioController.getAllUsers);

/* POST users */
router.post('/',MutilacionController.addMutilacion);
	
/*DELETE users*/
router.delete('/:id?', MutilacionController.deleteMutilacion);
/*UPDAATE users*/
router.put('/:id', MutilacionController.updateMutilacion);


module.exports = router;
