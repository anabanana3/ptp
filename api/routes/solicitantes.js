var express = require('express');
var router = express.Router();

var SolicitanteController = require('../controllers/solicitanteController');

router.get('/',SolicitanteController.getAllSolicitantes);
router.get('/:id?', SolicitanteController.getSolicitanteById);

//Este metodo se deberia hacer automatico cuando se crea un usuario
//router.post('/', SolicitanteController.addSolicitnate);

router.delete('/cancelar/:id?', SolicitanteController.cancelarUsuario);
//router.delete('/registrar/:id?', SolicitanteController.registrarUsuario);

module.exports = router;