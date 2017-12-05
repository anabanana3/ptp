var db=require('../dbconnection'); //reference of dbconnection.js
var bodyParser = require('body-parser');

var FamiliarModel = function(){}

FamiliarModel.getAllFamiliares=function(callback){
	db.query('SELECT * FROM FAMILIAR', callback);
};

//Falata modificar la select para que devuelva los datos realales de los familiares
FamiliarModel.getFamiliaresPersona = function(p, callback){
	//db.query('SELECT * FROM FAMILIAR WHERE ID_Persona =?', p, callback);
	//SELECT ID_Persona, p.Nombre, Edad, s.Sexo, e.Etnia, ID_Lugar, a.Nombre as Actividad
	//FROM PERSONA as p, ETNIAS e, ACTIVIDAD_LABORAL as a, SEXO as s WHERE p.ID_Sexo = s.ID_Sexo 
	//AND p.ETINAS_ID_Etnias = e.ID_Etnias AND p.ID_Actividad = a.ID_Actividad'
	db.query('SELECT p.ID_Persona, p.Nombre, Edad, s.Sexo, e.Etnia, ID_Lugar, a.Nombre as Actividad FROM PERSONA as p, ETNIAS as e, ACTIVIDAD_LABORAL as a, SEXO as s, FAMILIAR as f WHERE p.ID_Persona = f.ID_Familiar AND p.ID_Etnias = e.ID_Etnias AND p.ID_Actividad = a.ID_Actividad AND p.ID_Sexo = s.ID_Sexo AND f.ID_Persona=?',p, callback); 
	//AND p.ETINAS_ID_Etnias = e.ID_Etnias AND p.ID_Actividad = a.ID_Actividad')
};

FamiliarModel.addFamiliar = function(f, callback){
	db.query('INSERT INTO FAMILIAR VALUES (?,?,?)',[f.ID_Persona, f.ID_Familiar, f.Tipo], callback);
};

FamiliarModel.deleteFamiliar = function(p, f, callback){
	db.query('DELETE FROM FAMILIAR WHERE ID_Persona = ? AND ID_Familiar=?',[p,f], callback);
};

FamiliarModel.updateFamiliar = function(p,f, t, callback){
	db.query('UPDATE FAMILIAR ID_Persona=?, ID_Familiar=?, Tipo=?',[p,f,t.Tipo], callback);
};

module.exports = FamiliarModel;
