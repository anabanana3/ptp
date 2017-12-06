var MutilacionModel = require('../models/mutilacion');

var MutilacionController = function() {}

MutilacionController.getAllMutilaciones = function(req, res, callback){
	MutilacionModel.getAllMutilaciones(function(err, rows){
		if(err){ 
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}

MutilacionController.getMutilacionById = function(req, res, callback){
	var id = req.params.id;
	MutilacionModel.getMutilacionById(id ,function(err, rows){
		if(err){ 
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}

MutilacionController.addMutilacion = function(req, res, callback){
	MutilacionModel.addMutilacion(req.body, function(err, rows){
		if(err){ 
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}


MutilacionController.deleteMutilacion = function(req, res, callback){
	var id = req.params.id;
	MutilacionModel.deleteMutilacion(id, function(err, rows){
		if(err){ 
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}

MutilacionController.updateMutilacion = function(req, res, callback){
	var id = req.params.id;
	var m = req.body;
	MutilacionModel.updateMutilacion(id, m, function(err, rows){
		if(err){ 
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}

module.exports = MutilacionController
