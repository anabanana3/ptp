/*RUTAS*/

var express = require('express');
var router = express.Router();

var ComentariosController = require('../controllers/comentariosController');

/*GET*/
//Listado de todos los comentatios de un expediente
router.get('/expediente/:id?', ComentariosController.getCometariosExp);

//Listado de todos los cometarios de un usuario 
router.get('/usuario/:id?', ComentariosController.getCometariosUser);

/*POST*/
router.post('/', ComentariosController.addComentario);

/*DELETE*/
router.delete('/:c?/:e?', ComentariosController.deleteComentario);

/*UPDATE*/
router.put('/:c?/:e?',ComentariosController.updateComentario);

module.exports = router;