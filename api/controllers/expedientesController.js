var ExpedientesModel = require('../models/expedientes');

var ExpedientesController = function() {}

ExpedientesController.getAll = function(req, res, callback){
	ExpedientesModel.getAll(function(err, rows){
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}

ExpedientesController.getById = function(req, res, callback){
	var id = req.params.id;
	ExpedientesModel.getById(id, function(err, rows){
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}

ExpedientesController.addExpediente = function(req, res, callback){
	ExpedientesModel.addExpediente(req.body, function(err,rows){
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}

ExpedientesController.deleteExpediente = function(req, res, callback){
	var id = req.params.id;
	ExpedientesModel.deleteExpediente(id, function(err, rows){
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}

//Este seguramente haya que hacerlo por POST para añadir mas seguirdad a los datos.
ExpedientesController.updateExpediente = function(req, res, callback){
	var id = req.params.id;
	ExpedientesModel.updateExpediente(id, req.body, function(err, rows){

	});
}


module.exports = ExpedientesController;