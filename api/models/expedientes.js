/*Modelo*/
var db=require('../dbconnection'); //reference of dbconnection.js
var bodyParser = require('body-parser');

var ExpedienteModel = function() {}

ExpedienteModel.getAll = function(callback){
	db.query('SELECT * FROM EXPEDIENTES', callback);
};

ExpedienteModel.getById = function(id, callback){
	db.query('SELECT * FROM EXPEDIENTES WHERE ID_Expediente = ?', id, callback);
};

// TODO => HAY QUE PONER LA FECHA DE CREACION AUTOMATICA
ExpedienteModel.addExpediente = function(e, callback){
	//var date = new Date();
	//console.log(date.now());
	db.query('INSERT INTO EXPEDIENTES VALUES(?,?,?,?,?,?)',[null, e.Fecha, e.Descripcion, e.ID_Persona, e.ID_Lugar, e.ID_Usuario], callback); 
};

ExpedienteModel.deleteExpediente = function(id, callback){
	db.query('DELETE FROM EXPEDIENTES WHERE ID_Expediente=?', id, callback);
};

ExpedienteModel.updateExpediente = function(id, e, callback){
	db.query('UPDATE EXPEDIENTES SET ')
};

module.exports = ExpedienteModel;