/*Controlador*/

var PrivadosModel = require('../models/privados');
var PendietesVModel = require('../models/pendientesV');

var PrivadosController = function(){}

PrivadosController.getAllPrivados = function(req, res, callback){
	PrivadosModel.getAllPrivados(function(err, rows){
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}

PrivadosController.getPrivadosUser = function(req, res, callback){
	var user = req.params.id;
	PrivadosModel.getPrivadosUser(user, function(err, rows){
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}

PrivadosController.addPrivado = function(req, res, callback){
	var id = req.params.id;
	PrivadosModel.addPrivado(id, function(err, rows){
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}

//Esta funcion va a insertar el id en la tabla de pendietes 
//para que el administrador pueda validarlo
PrivadosController.publicarPrivado = function(req, res, callback){
	var id = req.params.id;
	PendietesVModel.addPendienteV(id);
}

PrivadosController.deletePrivado = function(req, res, callback){
	var id = req.params.id;
	PrivadosModel.deletePrivado(id, function(err, rows){
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}

module.exports = PrivadosController;