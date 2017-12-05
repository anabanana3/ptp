var EtniaModel = require('../models/etnia');

var EtniaController = function(){}

EtniaController.getAllEtnias = function(req, res, callback) {
	EtniaModel.getAllEtnias(function(err, rows){
		console.log('Vuelvo despues de ejecutar la selct en el modelo');
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

EtniaController.getEtniaById = function (req, res, callback) {
	console.log('Llego al controlador para debolver por id');
	console.log(req.params);
	console.log(req.params.id);
	var id = req.params.id;
	EtniaModel.getEtniaById(id , function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
	
}

EtniaController.getEtniaByRiesgo = function (req, res, callback){
	console.log('Llego al controlado para filtar por riesgo');
	var id = req.params.id;
	EtniaModel.getEtniaByRiesgo(id, function(err, rows){
		if(err){}
		else{
			res.json(rows);
		}
	});
}

EtniaController.addEtnia = function(req, res, callback){
	EtniaModel.addEtnia(req.body, function(err, rows){
		var result;
		if(err){
			result={
                                Resultado: 'Error',
                                Descripcion: 'La etnia no se ha creado'
                        }; 

		}
		else{
			result={
				Resultado: 'OK',
				Descripcion: 'Etnia creada correctamente'
			};
		}
		res.json(result);
	});
}

EtniaController.deleteEtnia = function (req, res, callback) {
	var id = req.params.id;
	EtniaModel.deleteEtnia(id,function( err, rows){
		 var result;
                if(err){
                        result={
                                Resultado: 'Error',
                                Descripcion: 'La etnia no se ha eliminado'
                        }; 

                }
                else{
                        result={
                                Resultado: 'OK',
                                Descripcion: 'Etnia eliminada correctamente'
                        };
                }
                res.json(result);

	});
}

EtniaController.updateEtnia = function (req, res, callback) {
	console.log('LLEGO ?');
	var id = req.params.id;
	var u = req.body;
	EtniaModel.updateEtnia(id, u, function(err, rows){
		var result;
                if(err){
                        result={
                                Resultado: 'Error',
                                Descripcion: 'La etnia no se ha modifiacado'
                        }; 

                }
                else{
                        result={
                                Resultado: 'OK',
                                Descripcion: 'Etnia modificada correctamente'
                        };
                }
                res.json(result);
	});
}

EtniaController.error404 = function(req, res, callback){}

module.exports =  EtniaController



