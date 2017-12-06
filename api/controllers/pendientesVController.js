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


//Este metodo solo lo va a poder hacer el administrador cuando decida que 
//un expediente pueda ser publicado.
PendientesVController.publicarExpediente = function(req, res, callback){
	var id = req.params.id;
	PendientesVModel.publicarExpediente(id, function(err, rows){
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}

//Este metodo es cuando el administrador decide que el expediente no se publica
PendientesVController.deleteExpediente = function(req, res, callback){
	var id = req.params.id;
	PendientesVModel.deleteExpediente(id, function(err, rows){
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}

module.exports = PendientesVController;
