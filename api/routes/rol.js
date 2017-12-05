var express = require('express');
var router = express.Router();
//var profesion = require('../models/profesion');
var RolController = require('../controllers/rolController');

/* GET profesion listing. */
router.get('/',RolController.getAllRoles);
router.get('/:id', RolController.getRolById);

/* POST profesiones */
router.post('/',RolController.addRol);

/*DELETE profesion*/
router.delete('/:id?', RolController.deleteRol);

/*UPDATE profesion*/
router.put('/:id', RolController.updateRol);

module.exports = router;
