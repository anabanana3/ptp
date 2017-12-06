var ProfesionModel = require('../models/profesion');

var ProfesionController = function(){}

ProfesionController.getAllProfesiones = function(req, res, callback) {
	ProfesionModel.getAllProfesiones(function(err, rows){
		//console.log('Vuelvo despues de ejecutar la selct en el modelo');
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

ProfesionController.getProfesionById = function (req, res, callback) {
	//console.log('Llego al controlador con el id');
	//console.log(req.params);
	//console.log(req.params.nombre);
	//console.log(req.params.id);
	var id = req.params.id;
	ProfesionModel.getProfesionById(id , function(err, rows){
		if(err){}
		else{
			res.json(rows);
		}
	});

}

ProfesionController.addProfesion = function(req, res, callback){
	ProfesionModel.addProfesion(req.body, function(err, rows){
		var result;
		if(err){
			result={
                                Resultado: 'Error',
                                Descripcion: 'La profesion no se ha creado'
                        };

		}
		else{
			result={
				Resultado: 'OK',
				Descripcion: 'Profesion creada correctamente'
			};
		}
		res.json(result);
	});
}

ProfesionController.deleteProfesion = function (req, res, callback) {
	var id = req.params.id;
	ProfesionModel.deleteProfesion(id,function( err, rows){
		 var result;
                if(err){
                        result={
                                Resultado: 'Error',
                                Descripcion: 'La profesion no se ha eliminado'
                        };

                }
                else{
                        result={
                                Resultado: 'OK',
                                Descripcion: 'Profesion eliminada correctamente'
                        };
                }
                res.json(result);

	});
}

ProfesionController.updateProfesion = function (req, res, callback) {
	//console.log('LLEGO ?');
	var id = req.params.id;
	var u = req.body;
	ProfesionModel.updateProfesion(id, u, function(err, rows){
		var result;
                if(err){
                        result={
                                Resultado: 'Error',
                                Descripcion: 'La profesion no se ha modifiacado'
                        };

                }
                else{
                        result={
                                Resultado: 'OK',
                                Descripcion: 'Profesion modificada correctamente'
                        };
                }
                res.json(result);
	});
}

ProfesionController.error404 = function(req, res, callback){}

module.exports =  ProfesionController
