/*rutas*/

var express = require('express');
var router = express.Router();

var CanceladosController = require('../controllers/canceladosController');

router.get('/',CanceladosController.getAllCancelados);

router.get('/:id?', CanceladosController.getCanceladoById);

//Pasarlos de CANCELADOS A REGISTRADOS
router.delete('/:id?', CanceladosController.registrarCancelado);



module.exports = router;
