var db=require('../dbconnection'); //reference of dbconnection.js
var bodyParser = require('body-parser');

var LugarModel = function(){}

LugarModel.getAllLugares = function(callback){
	db.query('SELECT * FROM LUGAR', callback);
};

LugarModel.getLugarById = function(id,callback){
	db.query('SELECT * FROM LUGAR WHERE ID_Lugar=?', id, callback);
}

LugarModel.addLugar = function(l,callback){
	db.query('INSERT INTO LUGAR VALUES (?,?)', [l.ID_Lugar, l.Pais], callback);
}

LugarModel.deleteLugar = function(id, callback){
	db.query('DELETE FROM LUGAR WHERE ID_Lugar=?', id, callback);
}

LugarModel.updateLugar =function(id, l, callback){
	db.query("UPDATE LUGAR SET ID_Lugar=?, Pais=? WHERE ID_Lugar=?",[l.ID_Lugar,l.Pais,id], callback);
};

LugarModel.lugar = function(l){
	db.query("INSERT INTO LUGAR VALUES(?, ?)", l, null);
}
module.exports = LugarModel;