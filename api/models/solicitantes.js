/*MODELO*/
var db=require('../dbconnection'); //reference of dbconnection.js
var bodyParser = require('body-parser');

var SolicitantesModel = function(){}

SolicitantesModel.getAllSolicitantes = function(callback){
	console.log('llego al modelo');
	 
	db.query('SELECT u.ID_Usuario, u.Nombre, u.Apellidos, u.F_Nacimiento, u.Email, p.Nombre as Profesion, a.Nombre as Asociacion FROM USUARIOS as u, SOLICITANTES as s,PROFESIONES as p, ASOCIACIONES as a WHERE u.ID_Usuario = s.ID_Usuario AND u.ID_Asociacion = a.ID_Asocioacion AND u.ID_Profesion = p.ID_Profesion', callback);
};
//Esta funcion crea automaticamente los usuarios
//solicitante cuando se crea un usuario normal
SolicitantesModel.addSolicitantes = function(id){
	console.log(id);
	db.query('INSERT INTO SOLICITANTES VALUES(?)', id);
};

//Pasar de SOLICITANTE A CANCELADO
SolicitantesModel.cancelarUsuario = function(id, callback){
	db.query("DELETE FROM SOLICITANTES WHERE ID_USUARIO=?", id);
	db.query("INSERT INTO CANCELADOS VALUES(?,?,?)",[id, null, null], callback);
};


module.exports = SolicitantesModel;