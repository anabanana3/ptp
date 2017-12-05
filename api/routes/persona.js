/*RUTAS*/
var express = require('express');
var router = express.Router();

var PersonaController = require('../controllers/personaController');

/*GET*/
router.get('/', PersonaController.getAllPersonas);
router.get('/:id?', PersonaController.getPersonaById);
router.get('/sexo/:id?', PersonaController.getPersonaBySexo);
router.get('/etnia/:id?', PersonaController.getPersonasByEtnias);
//Esta hay que probarla
router.get('/edad/:id?/:n?', PersonaController.getPersonas);

/*POST*/
router.post('/', PersonaController.addPersona);

/*DELETE*/
router.delete('/:id', PersonaController.deletePersona);

/*UPDATE*/
router.put('/:id',PersonaController.updatePersona);

module.exports = router;
