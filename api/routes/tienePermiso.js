var express = require('express');
var router = express.Router();
//var profesion = require('../models/profesion');
var TienePermisoController = require('../controllers/tienePermisoController');

/* GET*/
router.get('/',TienePermisoController.getAllTienePermiso);
router.get('/Rol=:id?', TienePermisoController.getTienePermisoByIdRol);
router.get('/Permiso=:id?', TienePermisoController.getTienePermisoByIdPermiso);
router.get('/Rol=:id?&Permiso=:id?', TienePermisoController.getTienePermisoByIdRolAndIdPermiso);

/* POST*/
router.post('/',TienePermisoController.addTienePermiso);

/*DELETE*/
//router.delete('/Rol=:?&Permiso=:?', TienePermisoController.deleteTienePermiso);

/*UPDATE*/
//router.put('/Rol=:?', TienePermisoController.updateRolByPermiso);
//router.put('/Permiso=:?', TienePermisoController.updatePermisoByRol);

module.exports = router;
