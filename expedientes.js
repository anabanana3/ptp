/*ROUTAS*/

var express = require('express');
var router = express.Router();

var ExpedienteController = require('../controllers/expedientesController');

/*GET*/
router.get('/', ExpedienteController.getAll);

router.get('/:id?', ExpedienteController.getById);

/*POST*/
router.post('/', ExpedienteController.addExpediente);

/*DELETE*/
router.delete('/:id?', ExpedienteController.deleteExpediente);

/*UPDATE*/
router.put('/:id?', ExpedienteController.updateExpediente);

module.exports = router;