var CanceladosModel = require('../models/cancelados');

var CanceladosController = function(){}

CanceladosController.getAllCancelados = function(req, res, callback){
	CanceladosModel.getAllCancelados(function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

CanceladosController.getCanceladoById = function(req, res, callback){
	var id = req.params.id;
	CanceladosModel.getCanceladoById(id, function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

CanceladosController.registrarCancelado = function(req, res, callback){
	var id = req.params.id;
	CanceladosModel.registrarCancelado(id, function(err, res){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

module.exports = CanceladosController; 