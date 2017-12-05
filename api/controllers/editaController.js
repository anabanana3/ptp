var EditaModel = require('../models/edita');

var EditaController = function(){}

EditaController.getAllEditables = function(req, res, callback){
	var id = req.params.id;
	EditaModel.getAllEditables(id, function(err, rows){
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}

EditaController.addEditable = function(req, res ,callback){
	EditaModel.addEditable(req.body, function(err, rows){
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}

EditaController.deleteEditable = function(req, res, callback){
	var u = req.params.u;//usuario
	var e = req.params.e;//expediente
	EditaModel.deleteEditable(u,e,function(err, rows){
		if(err){
			res.json(err);
		}else{
			res.josn(rows);
		}
	});
}

module.exports = EditaController;