var FamiliarModel = require('../models/familiar');

var FamiliarController = function(){}

FamiliarController.getAllFamiliares = function(req, res ,callback){
	FamiliarModel.getAllFamiliares(function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

FamiliarController.getFamiliaresPersona = function(req, res ,callback){
	var p = req.params.persona;
	FamiliarModel.getFamiliaresPersona(p, function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

FamiliarController.addFamiliar = function(req, res, callback){
	FamiliarModel.addFamiliar(req.body, function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

FamiliarController.deleteFamiliar = function(req, res, callback){
	var p = req.params.p;
	var f = req.params.f;
	FamiliarModel.deleteFamiliar(p,f, function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

FamiliarController.updateFamiliar = function(req, res, callback){
	var p = req.params.p;
	var f = req.params.f;
	FamiliarModel.updateFamiliar(p,f,req.body, function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

module.exports = FamiliarController;