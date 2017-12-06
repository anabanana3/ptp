var express = require('express');
var router = express.Router();
var AsociacionController = require('../controllers/asociacionController');


/*GET*/

router.get('/', AsociacionController.getAllAsociaciones);
router.get('/:id?',AsociacionController.getAsociacionById);

/*POST*/
router.post('/:id?', AsociacionController.addAsociacion);

/*DELETE*/
router.delete('/:id?', AsociacionController.deleteAsociacion);

/*UPDATE*/
router.put('/:id?', AsociacionController.updateAsociacion);


module.exports = router
