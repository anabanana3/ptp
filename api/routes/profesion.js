var express = require('express');
var router = express.Router();
//var profesion = require('../models/profesion');
var ProfesionController = require('../controllers/profesionController');

/* GET profesion listing. */
router.get('/',ProfesionController.getAllProfesiones);
router.get('/:id', ProfesionController.getProfesionById);

/* POST profesiones */
router.post('/',ProfesionController.addProfesion);

/*DELETE profesion*/
router.delete('/:id?', ProfesionController.deleteProfesion);

/*UPDATE profesion*/
router.put('/:id', ProfesionController.updateProfesion);

module.exports = router;
