var GFachada;
var GShader;
var gl;
var GCartoon = false; //para comprobar si esta en cartoon o no

var GAnimacion = false;

//VARIABLES PARA EL MATERIAL
var GDifuso;
var GAmbiental;
var GEspecular;
var GBrillo;

var GIntensidadLuz;

var stack = [];

//VARIABLES PARA LA LUZ
var GLDifuso;
var GLAmbiental;
var GLEspecular;

//cargando
var cargando = true;

//texto
var GtituloElement;
var GtituloNode;
var GdescripcionElement;
var GdescripcionNode;
var ctx;
