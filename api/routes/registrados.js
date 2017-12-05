/*RUTAS*/
var express = require('express');

/*Modulos añadidos para el login => creo que van mejor en el controller*/


var router = express.Router();

var RegistradosController = require('../controllers/registradosController');

router.get('/', RegistradosController.getAllRegistrados);

router.get('/:id?', RegistradosController.getRegistradoById);

router.post('/', RegistradosController.addRegistrado);
/*Faltaria el login*/
router.post('/signin', RegistradosController.signin);

router.put('/:id?', RegistradosController.updateRegistrado);

router.delete('/:id?', RegistradosController.cancelarRegistrado);

module.exports = router;