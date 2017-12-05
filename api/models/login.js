var db=require('../dbconnection'); //reference of dbconnection.js
var bodyParser = require('body-parser');

var LoginModel = function(){}

//De momento no hay mas metodos porque el login es solo para 
//consultar datos internamente no va a tener rutas
LoginModel.addLoginAux = function(l, callback){
	db.query('INSERT INTO Login values(?)',l, callback);
};

/*LoginModel.getAllLogin = function(callback){
	db.query('SELECT * FROM LOGIN', callback);
};

LoginModel.getLoginById = function(id, callback){
	db.query("SELECT * FROM LOGIN WHERE ID_Login=?", id, callback);
};

LoginModel.addLogin = function(l, callback){
	db.query("INSERT INTO LOGIN VALUES(?,?)", [l.ID_Login,l.Login], callback);
};

LoginModel.deleteLogin = function(id, callback){
	db.query("DELETE FROM LOGIN WHERE ID_Login=?", id, callback);
};

LoginModel.updateLogin = function(id, l, callback){
	db.query("UPDATE LOGIN SET ID_Login=?, Login=? WHERE ID_Login=?", [id, l.Login, id], callback);
};
*/
module.exports = LoginModel;