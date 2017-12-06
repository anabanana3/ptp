/*CONTROLADOR*/

var SexoModel = require('../models/sexo');

//Declaro el controlador
var SexoController = function() {}

SexoController.getAllSexos = function(req, res, callback){
	SexoModel.getAllSexos(function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

SexoController.getSexoById = function(req, res, callback){
	var id = req.params.id;
	SexoModel.getSexoById(id, function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

SexoController.addSexo = function(req, res, callback){
		SexoModel.addSexo(req.boy,function(err, rows){
			if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

SexoController.deleteSexo = function(req, res, callback){
	var id = req.params.id;
	SexoModel.deleteSexo(id, function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

SexoController.upadateSexo = function(req, res, callback){
	var id = req.params.id;
	SexoModel.upadateSexo(id, req.body, function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

module.exports = SexoController;