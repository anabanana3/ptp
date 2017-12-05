var db=require('../dbconnection'); //reference of dbconnection.js
var bodyParser = require('body-parser');

var PermisoModel = function(){}

PermisoModel.getAllPermisos = function(callback){
	//console.log('Llego al modelo para ejecutar la selct');
	db.query("select * from PERMISOS", callback);
};

PermisoModel.getPermisoById = function(id ,callback){
	db.query("SELECT * FROM PERMISOS WHERE ID_Permiso =?", id, callback);
};

PermisoModel.addPermiso = function(permiso, callback){
	db.query("INSERT INTO PERMISOS VALUES(?,?,?)",[permiso.ID_Permiso, permiso.Nombre, permiso.Descripcion], callback);
};

PermisoModel.deletePermiso = function(id, callback){
	db.query("DELETE FROM PERMISOS WHERE ID_Permiso = ?",id, callback);
};

PermisoModel.updatePermiso = function(id, p, callback){
	db.query("update PERMISOS set Nombre=?, Descripcion=? where ID_Permiso=?",[p.Nombre, p.Descripcion, id],callback);

};

module.exports= PermisoModel;
