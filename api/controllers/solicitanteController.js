var SolicitanteModel = require('../models/solicitantes');

var SolicitanteController = function(){}

SolicitanteController.getAllSolicitantes = function(req, res, callback){
	console.log('llego al controlador');
	SolicitanteModel.getAllSolicitantes(function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}


//SolicitanteController.addSolicitnate(
SolicitanteController.getSolicitanteById = function(req, res, callback){
	var id = req.params.id;
	SolicitanteModel.getSolicitanteById(function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			console.log('vuelvo del modelo');
			res.json(rows);
		}
	});
}

SolicitanteController.cancelarUsuario = function(req, res, callback){
	 var id = req.params.id;
	 SolicitanteModel.cancelarUsuario(id, function(err, rows){
	 	if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	 });
}

module.exports =  SolicitanteController;