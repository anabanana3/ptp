var db=require('../dbconnection'); //reference of dbconnection.js
var bodyParser = require('body-parser');
 
//var SolicitanteModel = require('../models/solicitantes');

var UsuarioModel = function(){}

UsuarioModel.getAllUsers = function(callback){
	console.log('Llego al modelo para ejecutar la selct');
	db.query("SELECT ID_Usuario, u.Nombre ,Apellidos, F_Nacimiento,u.Direccion,u.Email, a.Nombre as Asociacion, p.Nombre as Profesion, ID_Lugar FROM USUARIOS u, ASOCIACIONES a, PROFESIONES p WHERE u.ID_Asociacion = a.ID_Asocioacion AND u.ID_Profesion = p.ID_Profesion ", callback);
//	console.log(db.query("selct*from USUARIOS"));
};

UsuarioModel.getUserById = function(id ,callback){
	db.query("SELECT ID_Usuario, u.Nombre ,Apellidos, F_Nacimiento,u.Direccion,u.Email, a.Nombre as Asociacion, p.Nombre as Profesion, ID_Lugar FROM USUARIOS u, ASOCIACIONES a, PROFESIONES p WHERE u.ID_Asociacion = a.ID_Asocioacion AND u.ID_Profesion = p.ID_Profesion AND ID_Usuario=?", id, callback);

};

UsuarioModel.addUser = function(user, callback){
	console.log(user);
	db.query("INSERT INTO USUARIOS VALUES(?,?,?,?,?,?,?,?,?)",[user.ID_Usuario, user.Nombre,user.Apellidos,user.F_Nacimiento,user.Direccion,user.Email, user.ID_Asociacion, user.ID_Profesion, user.ID_Lugar],callback); 
	//var id = last_insert_rowid();
	//db.query("INSERT INRO SOLICITANTES VALUES (?)", id, callback);
};

UsuarioModel.deleteUser = function(id, callback){
	db.query("DELETE FROM USUARIOS WHERE ID_Usuario = ?",id, callback);
};

UsuarioModel.updateUser = function(id, u, callback){
	db.query("update USUARIOS set Nombre=?, Apellidos=?, F_Nacimiento=?, Email=?, Direccion=?, ID_Asociacion=?,ID_Profesion=?, ID_Lugar=? where ID_Usuario=?",[u.Nombre,u.Apellidos, u.F_Nacimiento,u.Email, u.Direccion, u.ID_Asociacions,u.ID_Profesion,u.ID_Lugar, id],callback);

};


 module.exports= UsuarioModel;

