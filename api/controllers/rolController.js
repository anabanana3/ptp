var RolModel = require('../models/rol');

var RolController = function(){}

RolController.getAllRoles = function(req, res, callback) {
	RolModel.getAllRoles(function(err, rows){
		//console.log('Vuelvo despues de ejecutar la selct en el modelo');
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

RolController.getRolById = function (req, res, callback) {
	//console.log('Llego al controlador con el id');
	//console.log(req.params);
	//console.log(req.params.nombre);
	//console.log(req.params.id);
	var id = req.params.id;
	RolModel.getRolById(id , function(err, rows){
		if(err){}
		else{
			res.json(rows);
		}
	});

}

RolController.addRol = function(req, res, callback){
	RolModel.addRol(req.body, function(err, rows){
		var result;
		if(err){
			result={
                                Resultado: 'Error',
                                Descripcion: 'El Rol no se ha creado'
                        };

		}
		else{
			result={
				Resultado: 'OK',
				Descripcion: 'Rol creado correctamente'
			};
		}
		res.json(result);
	});
}

RolController.deleteRol = function (req, res, callback) {
	var id = req.params.id;
	RolModel.deleteRol(id,function( err, rows){
		 var result;
                if(err){
                        result={
                                Resultado: 'Error',
                                Descripcion: 'El Rol no se ha eliminado'
                        };

                }
                else{
                        result={
                                Resultado: 'OK',
                                Descripcion: 'Rol eliminado correctamente'
                        };
                }
                res.json(result);

	});
}

RolController.updateRol = function (req, res, callback) {
	//console.log('LLEGO ?');
	var id = req.params.id;
	var u = req.body;
	RolModel.updateRol(id, u, function(err, rows){
		var result;
                if(err){
                        result={
                                Resultado: 'Error',
                                Descripcion: 'El Rol no se ha modifiacado'
                        };

                }
                else{
                        result={
                                Resultado: 'OK',
                                Descripcion: 'Rol modificado correctamente'
                        };
                }
                res.json(result);
	});
}

RolController.error404 = function(req, res, callback){}

module.exports =  RolController
