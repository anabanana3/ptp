/*MODELO*/
var db=require('../dbconnection'); //reference of dbconnection.js
var bodyParser = require('body-parser');

var PendientesVModel = function(){}

PendientesVModel.getAllPendientesV = function(callback){
	db.query('SELECT * FROM PENDIENTES_V', callback);
}
PendientesVModel.getPendientesUser = function(u, callback){
	db.query('SELECT * FROM PENDIENTES_V p, EXPEDIENTES e WHERE p.ID_Expediente = e.ID_Expediente AND e.ID_Usuario=?', u, callback);
};

PendientesVModel.publicarExpediente = function(id, callback){
	db.query('INSERT INTO PUBLICOS VALUES(?)', id);
	db.query('DELETE FROM PRIVADOS WHERE ID_Privado=?', id);
	db.query('DELETE FROM PENDIENTES_V WHERE ID_Expediente=?', id, callback);
}

PendientesVModel.addPendienteV = function(id, callback){
	db.query('INSERT INTO PENDIENTES_V VALUES(?)', id, callback);
};

//No de publica expediente => Solo el admin
PendientesVModel.deleteExpediente = function(id, callback){
	db.query('DELETE FROM PENDIENTES_V WHERE ID_Epediente = ?'. id, callback);
};


module.exports = PendientesVModel;