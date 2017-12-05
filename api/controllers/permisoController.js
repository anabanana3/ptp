var PermisoModel = require('../models/permiso');

var PermisoController = function(){}

PermisoController.getAllPermisos = function(req, res, callback) {
	PermisoModel.getAllPermisos(function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

PermisoController.getPermisoById = function (req, res, callback) {
	var id = req.params.id;
	PermisoModel.getPermisoById(id , function(err, rows){
		if(err){}
		else{
			res.json(rows);
		}
	});
}

PermisoController.addPermiso = function(req, res, callback){
	PermisoModel.addPermiso(req.body, function(err, rows){
		var result;
		if(err){
			result={
        Resultado: 'Error',
        Descripcion: 'El Permiso no se ha creado'
      };

		}
		else{
			result={
				Resultado: 'OK',
				Descripcion: 'Permiso creado correctamente'
			};
		}
		res.json(result);
	});
}

PermisoController.deletePermiso = function (req, res, callback) {
	var id = req.params.id;
	PermisoModel.deletePermiso(id,function( err, rows){
	  var result;
    if(err){
            result={
                    Resultado: 'Error',
                    Descripcion: 'El Permiso no se ha eliminado'
            };

    }
    else{
            result={
                    Resultado: 'OK',
                    Descripcion: 'Permiso eliminado correctamente'
            };
    }
    res.json(result);
	});
}

PermisoController.updatePermiso = function (req, res, callback) {
	var id = req.params.id;
	var u = req.body;
	PermisoModel.updatePermiso(id, u, function(err, rows){
		var result;
    if(err){
            result={
                    Resultado: 'Error',
                    Descripcion: 'El Permiso no se ha modifiacado'
            };

    }
    else{
            result={
                    Resultado: 'OK',
                    Descripcion: 'Permiso modificado correctamente'
            };
    }
    res.json(result);
	});
}

PermisoController.error404 = function(req, res, callback){}

module.exports =  PermisoController
