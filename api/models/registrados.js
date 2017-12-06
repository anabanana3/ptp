/*MODELO*/
var db=require('../dbconnection'); //reference of dbconnection.js
var bodyParser = require('body-parser');

var RegistradosModel = function(){}

RegistradosModel.getAllRegistrados = function(callback){
	//TODO => mostar tambien los datos de la tabla usuarios
	db.query('SELECT * FROM REGISTRADOS', callback);
};

RegistradosModel.getRegistradoById = function(id, callback){
	db.query('SELECT * FROM REGISTRAOS WHERE ID_Usuario = ?', id, callback);
};

//Esta funcion de momento no va a hacer falta
RegistradosModel.compruebaLogin = function(l, callback){
	db.query('SELECT count(*) as n FROM LOGIN WHERE Login=?', l, callback);
};

RegistradosModel.addRegistrado = function(idL,l,pwd, callback){
	console.log('Llego al modelo para crear el usuario registrado');
	console.log('datos que recibo=>'+l+'---'+pwd);
	db.query('DELETE FROM SOLICITANTES WHERE ID_Usuario=?', idL);
	db.query('INSERT INTO REGISTRADOS VALUES(?,?,?)', [idL, l, pwd],callback);

};

RegistradosModel.checkUser = function(l, p, callback){
	db.query('SELECT * FROM REGISTRADOS WHERE Login=? AND Password=?',[l, p], callback);
};
RegistradosModel.updateRegistrado = function(id,p, callback){
	db.query('UPDATE REGISTRADOS SET Password=? WHERE ID_Usuario=?',[p, id], callback);

};

RegistradosModel.cancelarRegistrado = function(id, callback){
	db.query('INSERT INTO CANCELADOS SELECT * FROM REGISTRADOS WHERE ID_Usuario=?', id);
	db.query('DELETE FROM REGISTRADOS WHERE ID_Usuario = ?', id , callback);

};

module.exports = RegistradosModel;