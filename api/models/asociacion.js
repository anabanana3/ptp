var db=require('../dbconnection'); //reference of dbconnection.js
var bodyParser = require('body-parser');

var AsociacionModel = function(){}

AsociacionModel.getAllAsociaciones = function(callback){
	console.log('llego al modelo');
	db.query("SELECT * FROM ASOCIACIONES", callback);
};

AsociacionModel.getAsociacionById = function(id, callback){
	db.query("SELECT * FROM ASOCIACIONES WHERE ID_ASOCIACION =?",id,callback);
};

AsociacionModel.addAsociacion = function(a, callback){
	db.query("INSERT INTO ASOCIACIONES VALUES(?,?,?,?)", [a.ID_Asociacion, a.Nombre, a.Email,a.Direccion],callback);
};

AsociacionModel.deleteAsociacion = function(id, callback){
	db.query("DELETE FROM ASOCIACIONES WHERE ID_Asocioacion=?", id, callback);
};

AsociacionModel.updateAsociacion = function(id, a, callback){
	db.query("UPDATE ASOCIACIONES SET  Nombre=?, Email=?, Direccion=? WHERE ID_Asociacion=?",[a.Nombre, a.Email, a.Direccion, id], callback);
};

module.exports = AsociacionModel;
