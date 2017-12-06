/*MODELO*/

var db = require('../dbconnection'); //reference of dbconnection.js
var bodyParser = require('body-parser');

var PrivadosModel = function(){}

PrivadosModel.getAllPrivados = function(callback){
	db.query('SELECT * FROM PRIVADOS',callback);
};

//Hay que modificar las consultas dependiendo lo que q
//vayamos a mostrar
PrivadosModel.getPrivadosUser = function(u, callback){
	db.query('SELECT * FROM PRIVADOS p, EXPEDIENTES e WHERE p.ID_Privado = e.ID_Expediente AND ID_Usuario=?',u, callback);
};

PrivadosModel.addPrivado = function(id, callback){
	db.query('INSERT INTO PRIVADOS VALUES(?)', id, callback);
};

PrivadosModel.deleteExpediente = function(id){
	db.query('DELETE FROM PRIVADOS WHERE ID_Privado=?', id);
}

module.exports = PrivadosModel;


