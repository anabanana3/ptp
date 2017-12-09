var UsuarioModel = require('../models/usuario');

var UsuarioController = function(){}

var SolicitanteModel = require('../models/solicitantes');

UsuarioController.getAllUsers = function(req, res, callback) {
	UsuarioModel.getAllUsers(function(err, rows){
		console.log('Vuelvo despues de ejecutar la selct en el modelo');
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

UsuarioController.getUserById = function (req, res, callback) {
	//console.log('Llego al controlador con el id');
	//console.log(req.params);
	//console.log(req.params.nombre);
	//console.log(req.params.id);
	var id = req.params.id;
	UsuarioModel.getUserById(id , function(err, rows){
		if(err){}
		else{
			res.json(rows);
		}
	});
	
}

UsuarioController.getUsersByAsociacion = function(req, res, callback){
	var a = req.params.id;
	UsuarioModel.getUsersByAsociacion(a, function(err, rows){
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}

UsuarioController.getUsersByProfesion = function(req, res, callback){
	var p = req.params.id;
	UsuarioModel.getUsersByProfesion(p, function(err, rows){
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}

UsuarioController.getUsersBySexo = function(req, res, callback){
	var sexo = req.params.id;
	UsuarioModel.getUsersBySexo(sexo, function(err, rows){
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
	});
}
/*******
	PENDIENTE DE VER COMO SE HACE => EN LA BD SOLO TENGO FECHA
UsuarioController.getUsersByEdad = function(req, res, callback){
	var e = req.params.n;
	var opt = req.params.opt;
	if(opt =='+'){
		UsuarioModel.getUsersByEdadMax(e, function(err, rows){
			if(err){
				res.json(err);
			}else{
				res.json(rows);
			}
		});
	}else{
		if(opt == '-'){
			UsuarioModel.getUsersByEdadMin(e, function(err, rows){
				if(err){
					res.json(err);
				}else{
					res.json(rows);
				}
			});
		}else{
			var aux ={
				descripcion: "Error al introducir la operación"
			}
			res.json(aux);
		}
	}
}

********/
UsuarioController.addUser = function(req, res, callback){
	UsuarioModel.addUser(req.body, function(err, rows){
		var result;
		if(err){
			res.json(err);
		}
		else{
			result={
				Resultado: 'OK',
				Descripcion: 'Usuario creado correctamente'
			};
			//TODO NECESITO EL ID DEL USUARIO QUE SE ACABA DE CREAR!!!!!!!!!!!!!!!!!
			//console.log(rows.insertId);
			var aux = rows.insertId;
			console.log(aux);
			SolicitanteModel.addSolicitantes(aux);
			res.json(rows);
		}
		//res.json(result);
	});
}



UsuarioController.deleteUser = function (req, res, callback) {
	var id = req.params.id;
	UsuarioModel.deleteUser(id,function( err, rows){
		 var result;
                if(err){
                        result={
                                Resultado: 'Error',
                                Descripcion: 'El usuario no se ha eliminado'
                        }; 
                        res.json(err);
                } 
                else{
                        result={
                                Resultado: 'OK',
                                Descripcion: 'Usuario eliminado correctamente'
                        };
                        res.json(rows);
                }
                //res.json(result);

	});
}

UsuarioController.updateUser = function (req, res, callback) {
	console.log('LLEGO ?');
	var id = req.params.id;
	var u = req.body;
	//console.log(req.body);
	//console.log(u);
	UsuarioModel.updateUser(id, u, function(err, rows){
		var result;
                if(err){
                        result={
                                Resultado: 'Error',
                                Descripcion: 'El usuario no se ha modifiacado'
                        }; 
                        res.json(err);
                }
                else{
                        result={
                                Resultado: 'OK',
                                Descripcion: 'Usuario modificado correctamente'
                        };
                        res.json(rows);
                }
               // res.json(result);
	});
}

UsuarioController.error404 = function(req, res, callback){}

module.exports =  UsuarioController



