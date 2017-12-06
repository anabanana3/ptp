/*RUTAS*/
var express = require('express');
var router = express.Router();

var PendientesVController = require('../controllers/pendientesVController');

router.get('/', PendientesVController.getAllPendientesV);

router.get('/:id?', PendientesVController.getPendientesUser);

router.post('/:id?', PendientesVController.publicarExpediente);

//Este metodo es cuando se decide no publicarlo => se queda privado
router.delete('/:id', PendientesVController.deleteExpediente);

module.exports = router;