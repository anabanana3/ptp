/*MODELO*/

var db = require('../dbconnection');
var bodyParser = require('body-parser');

var SexoModel = function() {}

SexoModel.getAllSexos = function(callback){
	db.query('SELECT * FROM SEXO', callback);
};

SexoModel.getSexoById = function(id, callback){
	db.query('SELECT * FROM SEXO WHERE ID_Sexo = ?', id, callback);
};

SexoModel.addSexo = function(s, callback){
	db.query('INSERT INTO SEXO VALUES(?,?)',[s.ID_Sexo, s.Sexo], callback);
};

SexoModel.deleteSexo = function(id, callback){
	db.query('DELETE FROM SEXO WHERE ID_Sexo=?', id, callback);
}
SexoModel.updateSexo = function(id, s, callback){
	db.query('UPDATE SEXO SET Sexo=? WHERE ID_Sexo=?',[s.Sexo, id], callback);
};

module.exports = SexoModel;