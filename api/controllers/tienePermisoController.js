var TienePermisoModel = require('../models/tienePermiso');

var TienePermisoController = function(){}

TienePermisoController.getAllTienePermiso = function(req, res, callback) {
	TienePermisoModel.getAllTienePermiso(function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

TienePermisoController.getTienePermisoByIdRol = function (req, res, callback) {
	var id = req.params.id;
	TienePermisoModel.getTienePermisoByIdRol(id , function(err, rows){
		if(err){}
		else{
			res.json(rows);
		}
	});
}

TienePermisoController.getTienePermisoByIdPermiso = function (req, res, callback) {
	var id = req.params.id;
	TienePermisoModel.getTienePermisoByIdPermiso(id , function(err, rows){
		if(err){}
		else{
			res.json(rows);
		}
	});
}

TienePermisoController.getTienePermisoByIdRolAndIdPermiso = function (req, res, callback) {
	var id = req.params.id[0];
	var id2 = req.params.id[1];
	TienePermisoModel.getTienePermisoByIdRolAndIdPermiso(id, id2 , function(err, rows){
		if(err){}
		else{
			res.json(rows);
		}
	});
}

TienePermisoController.addTienePermiso = function(req, res, callback){
	TienePermisoModel.addTienePermiso(req.body, function(err, rows){
		var result;
		if(err){
			result={
        Resultado: 'Error',
        Descripcion: 'La relación TienePermiso no se ha creado'
      };

		}
		else{
			result={
				Resultado: 'OK',
				Descripcion: 'La relación TienePermiso creada correctamente'
			};
		}
		res.json(result);
	});
}

/*
TienePermisoController.deleteTienePermiso = function (req, res, callback) {
	var id = req.params.id;
	TienePermisoModel.deleteTienePermiso(id,function( err, rows){
	  var result;
    if(err){
            result={
                    Resultado: 'Error',
                    Descripcion: 'La relación TienePermiso no se ha eliminado'
            };

    }
    else{
            result={
                    Resultado: 'OK',
                    Descripcion: 'La relación TienePermiso eliminada correctamente'
            };
    }
    res.json(result);
	});
}

TienePermisoController.updateRolByPermiso = function (req, res, callback) {
	var id = req.params.id;
	var u = req.body;
	TienePermisoModel.updateRolByPermiso(id, u, function(err, rows){
		var result;
    if(err){
            result={
                    Resultado: 'Error',
                    Descripcion: 'La relación TienePermiso por Permiso no se ha modifiacado'
            };

    }
    else{
            result={
                    Resultado: 'OK',
                    Descripcion: 'La relación TienePermiso por Permiso modificada correctamente'
            };
    }
    res.json(result);
	});
}

TienePermisoController.updatePermisoByRol = function (req, res, callback) {
	var id = req.params.id;
	var u = req.body;
	TienePermisoModel.updatePermisoByRol(id, u, function(err, rows){
		var result;
    if(err){
            result={
                    Resultado: 'Error',
                    Descripcion: 'La relación TienePermiso por Rol no se ha modifiacado'
            };

    }
    else{
            result={
                    Resultado: 'OK',
                    Descripcion: 'La relación TienePermiso por Rol modificada correctamente'
            };
    }
    res.json(result);
	});
}
*/
TienePermisoController.error404 = function(req, res, callback){}

module.exports =  TienePermisoController;
