var Camposb1Model = require('../models/camposb1');

var Camposb1Controller = function() {}

Camposb1Controller.getAll = function(req, res, callback){
	Camposb1Model.getAll(function(err, rows){
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}

Camposb1Controller.getById = function(req, res, callback){
	var id = req.params.id;
	Camposb1Model.getById(id, function(err, rows){
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}

Camposb1Controller.addCamposb1 = function(req, res, callback){
	Camposb1Model.addCamposb1(req.body, function(err,rows){
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}

Camposb1Controller.deleteCamposb1 = function(req, res, callback){
	var id = req.params.id;
	Camposb1Model.deleteCamposb1(id, function(err, rows){
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}

//Este seguramente haya que hacerlo por POST para añadir mas seguirdad a los datos.
Camposb1Controller.updateCamposb1 = function(req, res, callback){
	var id = req.params.id;
	Camposb1Model.updateCamposb1(id, req.body, function(err, rows){
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}


module.exports = Camposb1Controller;