/*CONTROLLER*/

var PendientesVModel = require('../models/pendientesV');

var PendientesVController = function() {}

PendientesVController.getAllPendientesV = function(req, res, callback){
	PendientesVModel.getAllPendientesV(function(err, rows){
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}

PendientesVController.getPendientesUser = function(req, res, callback){
	var user = req.params.id;
	PendientesVModel.getPendientesUser(user, function(err, rows){
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}

PendientesVModel.publicarExpediente = function(req, res, callback){
	var id = req.params.id;
	PendientesVModel.publicarExpediente(id, function(err, rows){
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}
