

attribute vec4 coordinates; //VERTICE EN COORDENADAS GLOBALES
attribute vec2 Textura; //TEXTURA COORDENADAS GLOBALES
attribute vec3 VertexNormal; //NORMAL EN COORDENADAS GLOBALES

varying vec3 Position; //VERTICES EN COORDENADAS DE VISTA
varying vec3 Normal; //NORMAL EN COORDENADAS DE VISTA
varying vec2 TexCoords; //COORDENADAS DE TEXTURA

uniform mat4 ModelViewMatrix; //MATRIZ DE MODELO Y VISTA (YA MULTIPLICADAS
uniform mat4 NormalMatrix; //MATRIZ DE NORMALES
uniform mat4 ProjectionMatrix; //MATRIZ DE PROYECCIÓN
uniform mat4 MVP; //MATRIZ MODELO*VISTA*PROYECCION

void main(void) {
 	//gl_Position = vec4(coordinates, 1.0);
 	Position = vec3( ModelViewMatrix * coordinates);
  Normal = normalize (vec3(NormalMatrix) * VertexNormal);
  TexCoords = Textura; //las coordenas de textura no se transforman
 	gl_Position = MVP*coordinates;
}
