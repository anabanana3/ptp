var express = require('express');
var router = express.Router();
//var profesion = require('../models/profesion');
var PermisoController = require('../controllers/permisoController');

/* GET*/
router.get('/',PermisoController.getAllPermisos);
router.get('/:id', PermisoController.getPermisoById);

/* POST*/
router.post('/',PermisoController.addPermiso);

/*DELETE*/
router.delete('/:id?', PermisoController.deletePermiso);

/*UPDATE*/
router.put('/:id', PermisoController.updatePermiso);

module.exports = router;
