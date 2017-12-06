/*RUTAS*/
var express = require('express');
var router = express.Router();

var PrivadosController = require('../controllers/privadosController');

/*GET*/
router.get('/', PrivadosController.getAllPrivados);

//Para devolver los expedientes privados de un usuario
router.get('/:id?', PrivadosController.getPrivadosUser);

/*POST*/
router.post('/:id?', PrivadosController.addPrivado);

//Publicar expediente => pasa a estrar pendiente de validar
router.post('/publicar/:id?', PrivadosController.publicarPrivado);


/*DELETE*/
//NO HACE FALTA PORQUE LO VAMOS A HACER DESDE EXPEDIENTES
//router.delete('/:id?', PrivadosController.deletePrivado);


module.exports = router;