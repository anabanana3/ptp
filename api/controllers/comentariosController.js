/*CONTROLLER*/
var CometariosModel = require('../models/comentarios');

var ComentariosController = function(){}

ComentariosController.getCometariosExp = function(req, res, callback){
	var exp = req.params.id;
	CometariosModel.getCometariosExp(exp, function(err, rows){
		if(err){
			res.json(err);
		}else{
			console.log(rows);
			res.json(rows);
		}
	});
}

ComentariosController.getCometariosUser = function(req, res ,callback){
	var user = req.params.id;
	CometariosModel.getCometariosUser(user, function(err, rows){
		if(err){
			res.json(err);
		}else{
			console.log(rows);
			res.json(rows);
		}
	});
}

ComentariosController.addComentario = function(req, res, callback){
	CometariosModel.addComentario(req.body, function(err, rows){
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}

ComentariosController.deleteComentario = function(req, res, callback){
	var idC = req.params.c;
	var idE = req.params.e;
	CometariosModel.deleteComentario(idC, idE, function(err, rows){
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}

ComentariosController.updateComentario = function(req, res, callback){
	var idC = req.params.c;
	var idE = req.params.e;
	var coment = req.body;
	CometariosModel.updateComentario(idC, idE, coment, function(err, rows){
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}

module.exports = ComentariosController;