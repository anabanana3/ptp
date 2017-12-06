/*MODELO*/

var db=require('../dbconnection'); //reference of dbconnection.js
var bodyParser = require('body-parser');

var ActividadModel = function(){}

ActividadModel.getAllActividades = function(callback){
	db.query('SELECT * FROM ACTIVIDAD_LABORAL', callback);
};

ActividadModel.getActividadById = function(id, callback){
	db.query('SELECT * FROM ACTIVIDAD_LABORAL WHERE ID_Actividad=?', id, callback);
};

ActividadModel.addActividad = function(a, callback){
	db.query('INSERT INTO ACTIVIDAD_LABORAL VALUES(?,?)', [a.ID_Actividad, a.Nombre], callback);
};

ActividadModel.deleteActividad = function(id , callback){
	db.query('DELETE FROM ACIVIDAD_LABORAL WHERE ID_ACTIVIDAD =?', id);
};

ActividadModel.updateActividad = function(id, a, callback){
	db.query('UPDATE ACTIVIDAD_LABORAL SET Nombre =? WHERE ID_Actividad =?',[a.Nombre, id], callback);
};

module.exports = ActividadModel;
