var ActividadModel = require('../models/actividadL');

var ActividadController =  function() {}

ActividadController.getAllActividades = function(req, res, callback){
	ActividadModel.getAllActividades(function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

ActividadController.getActividadById =  function(req, res, callback){
	var id = req.params.id;
	ActividadModel.getActividadById(id, function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

ActividadController.addActividad = function(req, res, callback){
	ActividadModel.addActividad(req.body, function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

ActividadController.deleteActividad =  function(req, res, callback){
	var id = req.params.id;
	ActividadModel.deleteActividad(id, function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

ActividadController.updateActividad = function(req, res, callback){
	var id = req.params.id;
	ActividadModel.updateActividad(id, req.body, function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

module.exports = ActividadController;