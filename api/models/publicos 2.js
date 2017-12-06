/*MODELO*/
var db = require('../dbconnection'); //reference of dbconnection.js
var bodyParser = require('body-parser');

var PublicosModel = function() {}

PublicosModel.getAllPublicos = function(callback){
	db.query('SELECT * FROM PUBLICOS', callback);
};

PublicosModel.getPublicoById = function(id, callback){
	db.query('SELECT * FROM PUBLICOS WHERE ID_Publico=?', id, callback);
};

PublicosModel.getPublicoByUser = function(id, callback){
	db.query('SELECT * FROM PUBLICOS p, EXPEDIENTES e WHERE p.ID_Publico = e.ID_Expediente AND e.ID_Usuario=?', id, callback);
};

PublicosModel.getPublicoByDate = function(f1, f2, callback){
	db.query('SELECT * FROM PUBLICOS p, EXPEDIENTES e WHERE ID_Publico = ID_Expediente AND e.Fecha BETWEEN ? AND ?',[f1,f2], callback);
};

PublicosModel.deleteExpediente = function(id){
	db.query('DELETE FORM PUBLICOS WHERE ID_Publico=?', id);
}
module.exports = PublicosModel;