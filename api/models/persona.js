/*MODELO */

var db=require('../dbconnection'); //reference of dbconnection.js
var bodyParser = require('body-parser');

var PersonaModel = function(){}

PersonaModel.getAllPersonas = function(callback){
	db.query('SELECT ID_Persona, p.Nombre, Edad, s.Sexo, e.Etnia, ID_Lugar, a.Nombre as Actividad  FROM PERSONA as p, ETNIAS e, ACTIVIDAD_LABORAL as a, SEXO as s WHERE p.ID_Sexo = s.ID_Sexo AND p.ID_Etnias = e.ID_Etnias AND p.ID_Actividad = a.ID_Actividad', callback);
};

PersonaModel.getPersonaById = function(id, callback){
	db.query('SELECT ID_Persona, p.Nombre, Edad, s.Sexo, e.Etnia, ID_Lugar, a.Nombre as Actividad  FROM PERSONA as p, ETNIAS e, ACTIVIDAD_LABORAL as a, SEXO as s WHERE p.ID_Sexo = s.ID_Sexo AND p.ID_Etnias = e.ID_Etnias AND p.ID_Actividad = a.ID_Actividad AND p.ID_Persona=?', id, callback);
};

PersonaModel.getPersonaBySexo = function(s, callback){
	db.query('SELECT ID_Persona, p.Nombre, Edad, s.Sexo, e.Etnia, ID_Lugar, a.Nombre as Actividad  FROM PERSONA as p, ETNIAS e, ACTIVIDAD_LABORAL as a, SEXO as s WHERE p.ID_Sexo = s.ID_Sexo AND p.ID_Etnias = e.ID_Etnias AND p.ID_Actividad = a.ID_Actividad AND p.ID_Sexo =?', s, callback);
};

PersonaModel.getMayores = function(edad, callback){
	db.query('SELECT ID_Persona, p.Nombre, Edad, s.Sexo, e.Etnia, ID_Lugar, a.Nombre as Actividad  FROM PERSONA as p, ETNIAS e, ACTIVIDAD_LABORAL as a, SEXO as s WHERE p.ID_Sexo = s.ID_Sexo AND p.ID_Etnias = e.ID_Etnias AND p.ID_Actividad = a.ID_Actividad AND Edad >=?', edad, callback);
};

PersonaModel.getMenores = function(edad, callback){
	db.query('SELECT ID_Persona, p.Nombre, Edad, s.Sexo, e.Etnia, ID_Lugar, a.Nombre as Actividad  FROM PERSONA as p, ETNIAS e, ACTIVIDAD_LABORAL as a, SEXO as s WHERE p.ID_Sexo = s.ID_Sexo AND p.ID_Etnias = e.ID_Etnias AND p.ID_Actividad = a.ID_Actividad AND Edad <=?', edad, callback);
};

PersonaModel.getPersonasByEtnias= function(e, callback){
	db.query('SELECT ID_Persona, p.Nombre, Edad, s.Sexo, e.Etnia, ID_Lugar, a.Nombre as Actividad  FROM PERSONA as p, ETNIAS e, ACTIVIDAD_LABORAL as a, SEXO as s WHERE p.ID_Sexo = s.ID_Sexo AND p.ID_Etnias = e.ID_Etnias AND p.ID_Actividad = a.ID_Actividad AND ETINAS_ID_Etnias=?', e, callback);
};

PersonaModel.addPersona = function(p, callback){
	db.query('INSERT INTO PERSONA VALUES(?,?,?,?,?,?,?)',[p.ID_Persona, p.Nombre, p.Edad,p.ID_Sexo,p.ETNIAS_ID_Etnias, p.ID_Lugar,p.ID_Actividad],callback);
};

PersonaModel.deletePersona = function(id, callback){
	db.query('DELETE FROM PERSONA WHERE ID_Persona=?',id, callback);
};

PersonaModel.updatePersona = function(id, p, callback){
	db.query('UPDATE PERSONA SET Nombre=?, Edad=?, ID_Sexo=?, ID_Etnias=?, ID_Lugar=?, ID_Actividad=? WHERE ID_Persona=?',[p.Nombre, p.Edad, p.ID_Sexo, p.ETNIAS_ID_Etnias, p.ID_Lugar, p.ID_Actividad, id],callback);
};

module.exports = PersonaModel;
