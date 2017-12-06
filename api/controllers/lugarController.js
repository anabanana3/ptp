var LugarModel = require('../models/lugares');

var LugarController = function(){}

LugarController.getAllLugares = function(req, res, callback){
	LugarModel.getAllLugares(function(err,rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

LugarController.getLugarById = function(req, res, callback){
	var id = req.params.id;
	LugarModel.getLugarById(id, function(err, rows){
		if(err){}
		else{
			res.json(rows);
		}
	});
}

LugarController.addLugar = function(req, res,callback){
	LugarModel.addLugar(req.body, function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			var result={
				Resultado: 'OK',
				Descripcion: 'Usuario creado correctamente'
			};
			res.json(result);
		}

	});
}

LugarController.deleteLugar = function(req, res, callback){
	var id = req.params.id;
	LugarModel.deleteLugar(id, function(err, rows){
		var result;
        if(err){
            res.json(err);
        }
        else{
            var result={
                Resultado: 'OK',
                Descripcion: 'Lugar eliminado correctamente'
            };
            res.json(result);
        }
	});
}

LugarController.updateLugar = function(req, res, callback){
	var id =  req.params.id;
	var l = req.body;
	LugarModel.updateLugar(id, l, function(err, rows){
		var result;
        if(err){
            res.json(err);
        }
        else{
            var result={
                Resultado: 'OK',
                Descripcion: 'Usuario modificado correctamente'
            };
            res.json(result);
        }
	});
}

module.exports = LugarController;