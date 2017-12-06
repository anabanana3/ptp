var db=require('../dbconnection'); //reference of dbconnection.js
var bodyParser = require('body-parser');

var TienePermisoModel = function(){}

TienePermisoModel.getAllTienePermiso = function(callback){
	//console.log('Llego al modelo para ejecutar la selct');
	db.query("select * from TIENE_PERMISO", callback);
};

TienePermisoModel.getTienePermisoByIdRol = function(id,callback){
	db.query("SELECT * FROM TIENE_PERMISO WHERE ID_Rol =?", id, callback);
};

TienePermisoModel.getTienePermisoByIdPermiso = function(id,callback){
	db.query("SELECT * FROM TIENE_PERMISO WHERE ID_Permiso =?", id, callback);
};

TienePermisoModel.getTienePermisoByIdRolAndIdPermiso = function(id1,id2,callback){
	db.query("SELECT * FROM TIENE_PERMISO WHERE ID_Rol=? AND ID_Permiso =?",[id1.ID_Rol, id2.ID_Permiso] , callback);
};

TienePermisoModel.addTienePermiso = function(tp, callback){
	console.log(tp.ID_Rol);
	console.log(tp.ID_Permiso);
	db.query("INSERT INTO TIENE_PERMISO VALUES(?,?)",[tp.ID_Rol, tp.ID_Permiso], callback);
};
/*
TienePermisoModel.deleteTienePermiso = function(id, callback){
	db.query("DELETE FROM TIENE_PERMISO WHERE ID_Rol=? AND ID_Permiso = ?",id, callback);
};

TienePermisoModel.updateRolByPermiso = function(id, tp, callback){
	db.query("update TIENE_PERMISO set ID_Rol=? where ID_Permiso=?",[tp.ID_Rol, id],callback);

};

TienePermisoModel.updatePermisoByRol = function(id, tp, callback){
	db.query("update TIENE_PERMISO set ID_Permiso=? where ID_Rol=?",[tp.ID_Permiso, id],callback);

};
*/
module.exports= TienePermisoModel;
