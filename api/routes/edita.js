/*RUTAS*/
var express = require('express');
var router = express.Router();

var EditaController = require('../controllers/editaController');

/*GET*/
//Listado de los expedientes que puede editar un usuario
router.get('/user/:id?',EditaController.getAllEditables);
//Listado de todos los usuario que pueden editar un expediente
router.get('/expediente/:id?', EditaController.getAllUsersEdita);
/*POST*/
//Dar permisos de edicion a un usuario para un expediente
router.post('/',EditaController.addEditable);

/*DELETE*/
//Elimiar el permiso de edicion de un usuario a un expediente.
router.delete('/:u?/:e?', EditaController.deleteEditable);

module.exports = router;