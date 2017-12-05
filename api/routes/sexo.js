//RUTAS

var express = require('express');
var router = express.Router();

var SexoController = require('../controllers/sexoController');

/*GET*/
router.get('/', SexoController.getAllSexos);
router.get('/:id?', SexoController.getSexoById);

/*POST*/
router.post('/', SexoController.addSexo);

/*DELETE*/
router.delete('/:id?', SexoController.deleteSexo);

/*UPDATE*/
router.put('/:id?', SexoController.upadateSexo);

module.exports = router;
