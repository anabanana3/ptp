/*RUTAS*/
var express = require('express');
var router = express.Router();

var ActividadController = require('../controllers/actividadLController');

/*GET*/
router.get('/', ActividadController.getAllActividades);
router.get('/:id?', ActividadController.getActividadById);

/*POST*/
router.post('/', ActividadController.addActividad);

/*DELETE*/
router.delete('/:id?', ActividadController.deleteActividad);

/*UPDATE*/
router.put('/:id?', ActividadController.updateActividad);

module.exports = router;