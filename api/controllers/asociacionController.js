var AsociacionModel = require('../models/asociacion');

var AsociacionController = function(){}

AsociacionController.getAllAsociaciones = function(req, res, callback){
	console.log('Llego al controlador');
	AsociacionModel.getAllAsociaciones(function(err, rows){
	console.log('Estoy en el controlador despues de ejecutar la select en el modelo');
		if(err){}
                else{
        		res.json(rows);
                }

	});
}

AsociacionController.getAsociacionById = function(req, res, callback){
	var id = req.params.id;
	AsociacionModel.getAsociacionById(id , function(err, rows){
		if(err){}
                else{
                        res.json(rows);
                }

	});
}

AsociacionController.addAsociacion = function(req, res, callback){
	AsociacionModel.addAsociacion(req.body, function(err, rows){
		var result;
                if(err){
                       // result={
                         //       Resultado: 'Error',
                           //     Descripcion: 'La Asociacion no se ha creado'
//                        }; 
			res.json(err);
                }
                else{
                        result={
                                Resultado: 'OK',
                                Descripcion: 'Asociacion creada correctamente'
                        };
                }
                res.json(result);

	});
}

AsociacionController.deleteAsociacion = function(req, res, callback){
	var id = req.params.id;
	AsociacionModel.deleteAsociacion(id, function(err, rows){
		 var result;
                if(err){
                       res.json(err);

                }
                else{
                        result={
                                Resultado: 'OK',
                                Descripcion: 'Usuario eliminado correctamente'
                        };
                }
                res.json(result);

	});
}

AsociacionController.updateAsociacion = function(req, res, callback){
	var id = req.params.id;
	var a = req.body;
	console.log(req.params);
	AsociacionModel.updateAsociacion(id, a, function(err ,rows){
		 var result;
                if(err){
                        result={
                                Resultado: 'Error',
                                Descripcion: 'La asociacion no se ha modifiacado'
                        }; 

                }
                else{
                        result={
                                Resultado: 'OK',
                                Descripcion: 'Asociacion modificada correctamente'
                        };
                }
                res.json(result);
	});
}


module.exports = AsociacionController
