var PersonaModel = require('../models/persona');

var PersonaController = function() {}

PersonaController.getAllPersonas = function(req, res, callback){
	PersonaModel.getAllPersonas(function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

PersonaController.getPersonaById = function(req, res, callback){
	var id = req.params.id;
	PersonaModel.getPersonaById(id, function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

//TODO falta terminar d eponer los metodos en el controlador, hacer la parte del modelo, investigar la ruta para
//filtar las personas por edad y pensar como hacer para devolver los familiares de una persona concreta 

PersonaController.getPersonaBySexo = function(req, res, callback){
	var s = req.params.id;
	PersonaModel.getPersonaBySexo(s, function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}
PersonaController.getPersonas = function(req, res, callback){
	console.log('Llego al controlador con la peticion especial');
	console.log(req.params);
	var edad = req.params.id;
	var opt = req.params.n;
	console.log(edad);
	console.log(opt);
	if(opt == '+'){
		PersonaModel.getMayores(edad, function(err, rows){
			res.json(rows);
		});
	}else{
		if(opt == '-'){
			PersonaModel.getMenores(edad, function(err, rows){
				res.json(rows);
			});
		}else{
			//error en la cadena
			var result={
				Resultado: "Error",
				Descripcion: "El operador no es valido"
			};
			res.json(result);
		}
	}

}

PersonaController.getPersonasByEtnias = function(req, res, callback){
	var id = req.params.id;
	PersonaModel.getPersonasByEtnias(id, function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

PersonaController.addPersona = function(req, res, callback){
	PersonaModel.addPersona(req.body, function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

PersonaController.deletePersona = function(req, res , callback){
	var id = req.params.id;
	PersonaModel.deletePersona(id, function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}
PersonaController.updatePersona = function(req, res, callback){
	var id = req.params.id;
	PersonaModel.updatePersona(id, req.body, function(err, rows){
		if(err){
			res.json(err);
		}
		else{
			res.json(rows);
		}
	});
}

module.exports = PersonaController;



