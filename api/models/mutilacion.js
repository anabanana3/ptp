var db=require('../dbconnection'); //reference of dbconnection.js
var bodyParser = require('body-parser');

var MutilacionModel = function(){}

MutilacionModel.getAllMutilaciones = function(callback){
	console.log('Llego al modelo para ejecutar la selct');
	db.query("select * from TIPO_MUTILACION", callback);
//	console.log(db.query("selct*from USUARIOS"));
};

MutilacionModel.getMutilacionById = function(id ,callback){
	db.query("SELECT * FROM TIPO_MUTILACION WHERE ID_MUTILACION = ?", id, callback);

};

MutilacionModel.addMutilacion = function(m, callback){
	db.query("INSERT INTO TIPO_MUTILACION VALUES(?,?,?,?)",[m.ID_Mutilacion, m.Tipo, m.Nombre, m.Descripcion], callback); 
};

MutilacionModel.deleteMutilacion = function(id, callback){
	db.query("DELETE FROM TIPO_MUTILACION WHERE ID_MUTILACION = ?",id, callback);
};

MutilacionModel.updateMutilacion = function(id, m, callback){
	db.query("update TIPO_MUTILACION set Descripcion=? WHERE ID_MUTILACION=?",[m.Descripcion, id], callback);

};


 module.exports= MutilacionModel;
