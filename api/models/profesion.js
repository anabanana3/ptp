var db=require('../dbconnection'); //reference of dbconnection.js
var bodyParser = require('body-parser');

var ProfesionModel = function(){}

ProfesionModel.getAllProfesiones = function(callback){
	//console.log('Llego al modelo para ejecutar la selct');
	db.query("select * from PROFESIONES", callback);
};

ProfesionModel.getProfesionById = function(id ,callback){
	db.query("SELECT * FROM PROFESIONES WHERE ID_Profesion =?", id, callback);
};

ProfesionModel.addProfesion = function(prof, callback){
	db.query("INSERT INTO PROFESIONES VALUES(?,?)",[prof.ID_Profesion, prof.Nombre], callback);
};

ProfesionModel.deleteProfesion = function(id, callback){
	db.query("DELETE FROM PROFESIONES WHERE ID_Profesion = ?",id, callback);
};

ProfesionModel.updateProfesion = function(id, p, callback){
	db.query("update PROFESIONES set Nombre=? where ID_Profesion=?",[p.Nombre, id],callback);

};

module.exports= ProfesionModel;
