/*MODELO*/
var db=require('../dbconnection'); //reference of dbconnection.js
var bodyParser = require('body-parser');

var CanceladosModel = function() {}

//CAMBIAR LAS CONSULTAS PARA QUE DEVUELVAN MAS DATOS
CanceladosModel.getAllCancelados = function(callback){
	db.query('SELECT * FROM CANCELADOS', callback);
};

//CAMBIAR LAS CONSULTAS PARA QUE DEVUELVAN MAS DATOS
CanceladosModel.getCanceladoById= function(id, callback){
	db.query('SELECT * FROM CANCELADOS WHERE ID_Usuario=?', id, callback);
};

CanceladosModel.registrarCancelado = function(id, callback){
	db.query('INSERT INTO REGISTRADOS SELECT * FROM CANCELADOS WHERE ID_Usuario=?', id);
	db.query('DELETE FORM CANCELADOS WHERE ID_Usuario=? ', id, callback);
}

module.exports = CanceladosModel;  