/*ROUTAS*/

var express = require('express');
var router = express.Router();

var Camposb1Controller = require('../controllers/camposb1Controller');

/*GET*/
router.get('/', Camposb1Controller.getAll);

router.get('/:id?', Camposb1Controller.getById);

/*POST*/
router.post('/', Camposb1Controller.addCamposb1);

/*DELETE*/
router.delete('/:id?', Camposb1Controller.deleteCamposb1);

/*UPDATE*/
router.put('/:id?', Camposb1Controller.updateCamposb1);

module.exports = router;