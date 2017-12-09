var db=require('../dbconnection'); //reference of dbconnection.js
var bodyParser = require('body-parser');
 
//var SolicitanteModel = require('../models/solicitantes');

var UsuarioModel = function(){}

UsuarioModel.getAllUsers = function(callback){
	console.log('Llego al modelo para ejecutar la selct');
	db.query("SELECT ID_Usuario, u.Nombre ,Apellidos,u.DNI,F_Nacimiento,u.Direccion,u.Email, a.Nombre as Asociacion, p.Nombre as Profesion, ID_Lugar, s.Sexo FROM USUARIOS u, ASOCIACIONES a, PROFESIONES p, SEXO s WHERE u.ID_Asociacion = a.ID_Asocioacion AND u.ID_Profesion = p.ID_Profesion AND u.ID_Sexo = s.ID_Sexo", callback);
//	console.log(db.query("selct*from USUARIOS"));
};

UsuarioModel.getUserById = function(id ,callback){
	db.query("SELECT ID_Usuario, u.Nombre ,Apellidos,u.DNI,F_Nacimiento,u.Direccion,u.Email,a.Nombre as Asociacion, p.Nombre as Profesion, ID_Lugar,s.Sexo FROM USUARIOS u, ASOCIACIONES a, PROFESIONES p, SEXO s WHERE u.ID_Asociacion = a.ID_Asocioacion AND u.ID_Profesion = p.ID_Profesion AND u.ID_Sexo = s.ID_Sexo AND ID_Usuario=?", id, callback);

};

UsuarioModel.getUsersByAsociacion = function(id, callback){
	db.query('SELECT ID_Usuario, u.Nombre ,Apellidos,u.DNI,F_Nacimiento,u.Direccion,u.Email, a.Nombre as Asociacion, p.Nombre as Profesion, ID_Lugar, s.Sexo FROM USUARIOS u, ASOCIACIONES a, PROFESIONES p, SEXO s WHERE u.ID_Asociacion = a.ID_Asocioacion AND u.ID_Profesion = p.ID_Profesion AND u.ID_Sexo = s.ID_Sexo AND u.ID_Asociacion=?', id, callback);
};

UsuarioModel.getUsersByProfesion = function(id, callback){
	db.query('SELECT ID_Usuario, u.Nombre ,Apellidos,u.DNI,F_Nacimiento,u.Direccion,u.Email, a.Nombre as Asociacion, p.Nombre as Profesion, ID_Lugar, s.Sexo FROM USUARIOS u, ASOCIACIONES a, PROFESIONES p, SEXO s WHERE u.ID_Asociacion = a.ID_Asocioacion AND u.ID_Profesion = p.ID_Profesion AND u.ID_Sexo = s.ID_Sexo AND u.ID_Profesion=?',id, callback);
};

/*
PENDIENTE DE VER COMO HACERLO!!!!!!!
UsuarioModel.getUsersByEdadMax = function(e, callback){
	db.query('SELECT ID_Usuario, u.Nombre ,Apellidos,u.DNI,F_Nacimiento,u.Direccion,u.Email, a.Nombre as Asociacion, p.Nombre as Profesion, ID_Lugar, s.Sexo FROM USUARIOS u, ASOCIACIONES a, PROFESIONES p, SEXO s WHERE u.ID_Asociacion = a.ID_Asocioacion AND u.ID_Profesion = p.ID_Profesion AND u.ID_Sexo = s.ID_Sexo AND ')
};
UsuarioModel.getUsersByEdadMin = function(e, callback){

};

*/

UsuarioModel.getUsersBySexo = function(s, callback){
	db.query('SELECT ID_Usuario, u.Nombre ,Apellidos,u.DNI,F_Nacimiento,u.Direccion,u.Email, a.Nombre as Asociacion, p.Nombre as Profesion, ID_Lugar, s.Sexo FROM USUARIOS u, ASOCIACIONES a, PROFESIONES p, SEXO s WHERE u.ID_Asociacion = a.ID_Asocioacion AND u.ID_Profesion = p.ID_Profesion AND u.ID_Sexo = s.ID_Sexo AND u.ID_Sexo=?', s, callback);
};

UsuarioModel.addUser = function(user, callback){
	console.log(user);
	db.query("INSERT INTO USUARIOS VALUES(?,?,?,?,?,?,?,?,?,?,?)",[user.ID_Usuario, user.Nombre,user.Apellidos,user.F_Nacimiento,user.DNI, user.Direccion,user.Email, user.ID_Asociacion, user.ID_Profesion, user.ID_Lugar, user.Sexo],callback); 
	//var id = last_insert_rowid();
	//db.query("INSERT INRO SOLICITANTES VALUES (?)", id, callback);
};

UsuarioModel.deleteUser = function(id, callback){
	db.query("DELETE FROM USUARIOS WHERE ID_Usuario = ?",id, callback);
};

UsuarioModel.updateUser = function(id, u, callback){
	db.query("update USUARIOS set Nombre=?, Apellidos=?, F_Nacimiento=?, Email=?, Direccion=?, ID_Asociacion=?,ID_Profesion=?, ID_Lugar=?, DNI=?, ID_Sexo=? where ID_Usuario=?",[u.Nombre,u.Apellidos, u.F_Nacimiento,u.Email, u.Direccion, u.ID_Asociacions,u.ID_Profesion,u.ID_Lugar,u.DNI, u.Sexo, id],callback);

};


 module.exports= UsuarioModel;

