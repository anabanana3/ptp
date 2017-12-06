/*RUTAS*/
var express = require('express');
var router = express.Router();

var PublicosController = require('../controllers/publicosController');

/*GET*/
router.get('/', PublicosController.getAllPublicos);
router.get('/:id?', PublicosController.getPublicoById);
router.get('/usuario/:id?', PublicosController.getPublicoByUser);
router.get('/:f1?/:f2?', PublicosController.getPublicoByDate);

/*DELETE*/
//No haria falta hacerlo => ya esta en expedientes normales
//Solo voy a poder borrar los expediente que sean del usuario que quiera borrar
//router.delete('/:id?', PublicosController.deletePublico);

module.exports = router;