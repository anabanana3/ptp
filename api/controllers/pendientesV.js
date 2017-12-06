/*ROUTAS*/
var express = require('express');
var router = express.Router();

var PendientesVController = require('../controllers/pendientesVController');

/*GET*/
router.get('/', PendientesVController.getAllPendientesV);

//Expedientes que un usuario tiene pendientes de validar
router.get('/:id?', PendientesVController.getPendientesUser);

/*DELETE*/
//Esta ruta va a eliminar el registro de la tabla pendientes
//y lo va a crear en la tabla publicados
router.delete('/:id', PendientesVController.publicarExpediente);




module.exports = router;