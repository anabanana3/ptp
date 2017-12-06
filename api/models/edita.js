/*MODELO*/

var db=require('../dbconnection'); //reference of dbconnection.js
var bodyParser = require('body-parser');

var EditaModel = function(){}

EditaModel.getAllEditables = function(id, callback){
	db.query('SELECT * FROM EDITA WHERE ID_Usuario=?', id, callback);
};

EditaModel.addEditable = function(aux, callback){
	db.query('INSERT INTO EDITA VALUES (?,?)',[aux.ID_Usuario, aux.ID_Expediente], callback);
};

EditaModel.deleteEditable =function(u, e, callback){
	db.query('DELETE FROM EDITA WHERE ID_Usuario=? and ID_Expediente=?'[u,e], callback);
};

module.exports = EditaModel;