//  TODAS ESTAS VARIABLES SON GLOBALES PARA ACCEDER EN LOS METODOS DEL MOTOR

var stack = []; //pila de procesos del arbol

var GFachada; //variable para acceder a la clase fachada
var GShader;  //variable para acceder a la clase fachada
var gl; //variable de gl
var GCartoon = false; //para comprobar si esta en cartoon o no

var GAnimacion = false; // para comprobar si la animacion esta en ejecución o no

//variable de carga para momentos en los que tenemos que controlar la sincronicidad de JS
var cargando = true;

//variables del texto descriptivo que costramos en el canvas
var GtituloElement;
var GtituloNode;
var GdescripcionElement;
var GdescripcionNode;
