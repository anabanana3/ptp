/*Modelo*/
var db=require('../dbconnection'); //reference of dbconnection.js
var bodyParser = require('body-parser');

var Camposb1Model = function() {}

Camposb1Model.getAll = function(callback){
	db.query('SELECT * FROM CAMPOS_B1', callback);
};

Camposb1Model.getById = function(id, callback){
	db.query('SELECT * FROM CAMPOS_B1 WHERE ID_Expediente = ?', id, callback);
};

// TODO => HAY QUE PONER LA FECHA DE CREACION AUTOMATICA
Camposb1Model.addCamposb1 = function(e, callback){
	//var date = new Date();
	//console.log(date.now());
	db.query('INSERT INTO CAMPOS_B1 VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)','null, e.ID_Expediente, e.Citacion, e.Deriv_Riesgo, e.Deriv_Sospecha, e.Otros, e.Acomp_P, e.Acomp_M, e.Acomp_H, e.Acomp_O, e.Dif_Idi_M, e.Traduccion, e.Mediacion, e.Curso, e.Centro_Salud', callback); 
};

Camposb1Model.deleteCamposb1 = function(id, callback){
	db.query('DELETE FROM CAMPOS_B1 WHERE ID_Expediente=?', id, callback);
};

Camposb1Model.updateCamposb1 = function(id, e, callback){
	db.query("UPDATE CAMPOS_B1 SET Citacion=?, Deriv_Riesgo=?, Deriv_Sospecha=?, Otros=?, Acomp_P=?, Acomp_M=?, Acomp_H=?, Acomp_O=?, Dif_Idi_M=?, Traduccion=?, Mediacion=?, Curso=?, Centro_Salud=? WHERE ID_Expediente=?", [e.Citacion, e.Deriv_Riesgo, e.Deriv_Sospecha, e.Otros, e.Acomp_P, e.Acomp_M, e.Acomp_H, e.Acomp_O, e.Dif_Idi_M, e.Traduccion, e.Mediacion, e.Curso, e.Centro_Salud,id], callback);
};

module.exports = Camposb1Model;