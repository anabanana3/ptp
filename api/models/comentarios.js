/*MODEL*/
var db=require('../dbconnection'); //reference of dbconnection.js
var bodyParser = require('body-parser');

var CometariosModel = function(){}

CometariosModel.getCometariosExp = function(id, callback){
	db.query("SELECT ID_Comentario, ID_Expediente, Comentario, DATE(Fecha) as Fecha, ID_Usuario FROM COMENTARIOS WHERE ID_Expediente =?", id ,callback);
};

CometariosModel.getCometariosUser = function(user, callback){
	db.query("SELECT ID_Comentario, ID_Expediente, Comentario, DATE(Fecha) as Fecha, ID_Usuario FROM COMENTARIOS WHERE ID_Usuario =?", user ,callback);	
};

CometariosModel.addComentario = function(c, callback){
	db.query('INSERT INTO COMENTARIOS VALUES(?,?,?,?,?)',[c.ID_Comentario,c.ID_Expediente,null, c.Comentario,c.ID_Usuario], callback);
};

CometariosModel.deleteComentario = function(idC, idE, callback){
	db.query('DELETE FROM COMENTARIOS WHERE ID_Comentario=? AND ID_Expediente=?',[idC, idE], callback);
};

CometariosModel.updateComentario = function(idC, idE, c, callback){
	db.query('UPDATE COMENTARIOS SET Comentario=? WHERE ID_Comentario=? AND ID_Expediente =?',[c.Comentario, idC, idE], callback);
};

module.exports = CometariosModel;