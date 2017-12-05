var express = require('express');
var router = express.Router();
//var usuario = require('../models/usuario');
var UsuarioController = require('../controllers/usuarioController');

/* GET users listing. */
router.get('/',UsuarioController.getAllUsers);
router.get('/:id?', UsuarioController.getUserById);
//router.get('/nombre=:?', UsuarioController.getAllUsers);

/* POST users */
router.post('/',UsuarioController.addUser);
	
/*DELETE users*/
router.delete('/:id?', UsuarioController.deleteUser);
/*UPDAATE users*/
router.put('/:id', UsuarioController.updateUser);


module.exports = router;
