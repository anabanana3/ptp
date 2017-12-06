var db=require('../dbconnection'); //reference of dbconnection.js
var bodyParser = require('body-parser');

var RolModel = function(){}

RolModel.getAllRoles = function(callback){
	//console.log('Llego al modelo para ejecutar la selct');
	db.query("select * from ROLES", callback);
};

RolModel.getRolById = function(id ,callback){
	db.query("SELECT * FROM ROLES WHERE ID_Rol =?", id, callback);
};

RolModel.addRol = function(rol, callback){
	db.query("INSERT INTO ROLES VALUES(?,?)",[rol.ID_Rol, rol.Nombre], callback);
};

RolModel.deleteRol = function(id, callback){
	db.query("DELETE FROM ROLES WHERE ID_Rol = ?",id, callback);
};

RolModel.updateRol = function(id, r, callback){
	db.query("update ROLES set Nombre=? where ID_Rol=?",[r.Nombre, id],callback);

};

module.exports= RolModel;
