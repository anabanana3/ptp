/*RUTAS*/

var express = require('express');
var router = express.Router();

var FamiliarControler = require('../controllers/familiarController');

/*GET*/
router.get('/', FamiliarControler.getAllFamiliares);
//Familiares de una persona
router.get('/:persona?', FamiliarControler.getFamiliaresPersona);

/*POST*/
router.post('/', FamiliarControler.addFamiliar);

/*DELETE*/
//Esta ruta necesita dos parametros para no borrar todos los familiares de una persona o 
// borrar todos los registros donde aparece una persona
router.delete('/:p/:f', FamiliarControler.deleteFamiliar);
/*UPDATE*/
router.put('/:p/:f', FamiliarControler.updateFamiliar);

module.exports = router;