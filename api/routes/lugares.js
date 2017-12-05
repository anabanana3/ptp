/*RUTAS*/
var express = require('express');
var router = express.Router();
//var usuario = require('../models/usuario');
var LugarController = require('../controllers/lugarController');

/* GET users listing. */
router.get('/',LugarController.getAllLugares);
router.get('/:id?', LugarController.getLugarById);
//router.get('/nombre=:?', UsuarioController.getAllUsers);

/* POST users */
router.post('/',LugarController.addLugar);
	
/*DELETE users*/
router.delete('/:id?', LugarController.deleteLugar);
/*UPDAATE users*/
router.put('/:id', LugarController.updateLugar);


module.exports = router;
