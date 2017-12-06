/*CONTROLLER*/

var PublicosModel = require('../models/publicos');

var PublicosController = function() {}

PublicosController.getAllPublicos = function(req, res, callback){
	PublicosModel.getAllPublicos(function(err, rows){
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}

PublicosController.getPublicoById = function(req, res, callback){
	var id = req.params.id;
	PublicosModel.getPublicoById(id, function(err, rows){
		if(err){
			res.json(err);
		}else
			res.json(rows);
	});
}

PublicosController.getPublicoByUser = function(req, res, callback){
	var user = req.params.id;
	PublicosModel.getPublicoByUser(user, function(err, rows){
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}

PublicosController.getPublicoByDate = function(req, res, callback){
	var f1 = req.params.f1;
	var f2 = req.params.f2;
	PublicosModel.getPublicoByDate(f1,f2, function(err, rows){
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}

module.exports = PublicosController;