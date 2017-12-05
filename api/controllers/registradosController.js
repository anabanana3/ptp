var RegistradosModel = require('../models/registrados');
var LoginModel = require('../models/login');

//Añadido para realizar el login
var jwt = require('jsonwebtoken') ; 
var atob = require('atob') ; 
var Cryptr = require('cryptr'); 
var cryptr = new Cryptr('beecodea5a') ; 

var RegistradosController = function() {}

RegistradosController.getAllRegistrados = function(req, res, callback){
	RegistradosModel.getAllRegistrados(function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

RegistradosController.getRegistradoById = function(req, res, callback){
	var id = req.params.id;
	RegistradosModel.getRegistradoById(id, function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}
//REGISTRAR USUARIO => Hay que llevar cuidado con los id's para que no
//se crucen datos
//FALTA CIFRAR LA CONTRASEÑA PARA NO GUARDARLA EN TEXTO PLANO
RegistradosController.addRegistrado = function(req, res, callback){
	//AQUI ES DONDE HABIRA QUE CIFRAR LAS CONTRASEÑAS PARA LUEGO
	//ALMACENARLAS EN LA BD
	//Primero compruebo si el login es valido
	var login = req.body.Login;
	var result;
	var user = req.body;
	console.log('Llego al controlador => compruebo el login');
	RegistradosModel.compruebaLogin(login, function(err, rows){
		console.log(rows[0].n);
		if(rows[0].n == 1){
			//existe => devolver un JSON con el error
			console.log('El login existe => error');
			result={
				Resultado: "Error",
				Descripcion: "El login no es valido"
			};
			res.json(result);

		}else{
			//no existe =>el login
			console.log('El login no existe => creo el login');
			LoginModel.addLoginAux(login, function(err, rows){
				if(err){
					res.json(err);
				}else{
					//No da error al crear el login  => creo el usuario
					//var aux = rows.insertId;
					var aux = req.body.ID_Usuario;
					var pwd = user.Password;
					var dec_pwd = atob(pwd);
					var pwdE = cryptr.encrypt(dec_pwd);
					console.log('Muestro la contraseña cifrada a ver si cabe');
					console.log(pwdE);
					console.log('Ahora puedo crear el usuario');
					console.log('Login: '+login);

					RegistradosModel.addRegistrado(aux, login,pwdE, function(err, rows){
						if(err){	
							res.json(err);
						}else{
							result={
								Resultado: 'OK',
								Descripcion: 'El usuario se ha creado correctamente'
							};
						}
						res.json(result);
					});
				}
			});
		}
	});
}
//LOGIN
RegistradosController.signin = function(req, res, callback){
	var login = req.body.Login;
	var pwd = req.body.Password;
	var dec_pwd = atob(pwd);
	var pwdE = cryptr.encrypt(dec_pwd);
	//var sql="SELECT id, first_name, last_name, email FROM `login` WHERE `email`='"+name+"' and password = '"+encrypted_pass+"'";
	RegistradosModel.checkUser(login, pwdE, function(err, rows){
		if(rows!=''){
			//Empezamos a generar el token para mandarlo a las vistas.
			console.log(rows);
			var data = JSON.stringify(rows);
			var secret = 'AISHA5A';
			var now = Math.floor(Date.now()/1000);
			var iat = (now - 10);
			var expiresIn = 3600;
			var expr = (now + expiresIn);
			var notBefore = (now - 10);
			var jwtId =  Math.random().toString(36).substring(7);
			var payload = {
				iat: iat,
				jwtId: jwtId,
				audience: 'TEST',
				data: data
			};
			console.log('Declaro todas las variables y proceso a crear el token');
			jwt.sign(payload, secret,{algorithm: 'HS256', expiresIn: expiresIn}, function(err, token){
				if(err){
					console.log('Error mientras se generaba el token');
					console.log(err);
				}else{
					console.log('no se produce error al generar el token');
					if(token != false){
						res.header();
						res.json({
							"results":
							{"status": "true"},
							"token": token,
							"data": rows
						});
						res.end();
					}else{
						console.log('no se ha podido crear el token');
					}
				}
			});
		}else{
			console.log('El usuario y/o contraseña son incorrectos');
		}
	});
}
//SOLO PERMITE CAMBIAR LA CONTRASEÑA!!!!!!!!!!!
RegistradosController.updateRegistrado = function(req, res, callback){
	//AQUI TAMBIEN HAY QUE VER COMO CIFRAMOS LOS DATOS PARA ALMACENARLOS
	//EN LA BASE DE DATOS
	var idU = req.body.ID_Usuario;
	//var login = req.params.Login;
	var pwd = req.params.Password;
	var dec_pwd = atob(pwd);
	var pwdE = cryptr.encrypt(dec_pwd);
	//Tengo que comprobar si el login que quiere cambiarse esta disponible
	RegistradosModel.updateRegistrado(idU, pwdE, function(err, rows){
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
	});

}
//MOVER LOS DATOS DE LA TABLA REGISTRADOS A CANCELADOS
RegistradosController.cancelarRegistrado = function(req, res, callback){
	RegistradosModel.cancelarRegistrado(id, function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

module.exports =  RegistradosController;
