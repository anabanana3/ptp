
var db=require('../dbconnection'); //reference of dbconnection.js
var bodyParser = require('body-parser');

var EtniaModel = function(){}

EtniaModel.getAllEtnias = function(callback){
	console.log('Llego al modelo para ejecutar la selct');
	db.query("select * from ETNIAS", callback);
  //console.log(db.query("selct*from USUARIOS"));
};

EtniaModel.getEtniaById = function(id ,callback){
	db.query("SELECT * FROM ETNIAS WHERE ID_Etnias =?", id, callback);
};

EtniaModel.getEtniaByRiesgo = function(id ,callback){
	db.query("SELECT * FROM ETNIAS WHERE Riesgo =?", id, callback);
};

EtniaModel.addEtnia = function(etnia, callback){
	console.log(etnia);
	db.query("INSERT INTO ETNIAS VALUES(?,?,?)",[etnia.ID_Etnia, etnia.Etnia, etnia.Riesgo], callback);
};

EtniaModel.deleteEtnia = function(id, callback){
	db.query("DELETE FROM ETNIAS WHERE ID_Etnia = ?",id, callback);
};

EtniaModel.updateEtnia = function(id, etnia, callback){
	db.query("update ETNIAS set Etnia=? where ID_Etnia=?",[etnia.Etnia, id],callback);

};
 module.exports= EtniaModel;
