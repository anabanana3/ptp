

/*attribute vec4 coordinates; //VERTICE EN COORDENADAS GLOBALES
attribute vec2 Textura; //TEXTURA COORDENADAS GLOBALES
attribute vec3 VertexNormal; //NORMAL EN COORDENADAS GLOBALES
attribute vec4 aVertexPosition;

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
}*/

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aVertexTextureCoords;

uniform mat4 ModelViewMatrix;
uniform mat4 ProjectionMatrix;
uniform mat4 NormalMatrix;

uniform vec3 uLightDirection; //Directional light
uniform vec3 uLightPosition; //Positional light
uniform vec4 uLightDiffuse;
uniform vec4 uLightAmbient;
uniform vec4 uMaterialDiffuse;

varying vec4 vFinalColor;
varying vec3 vNormal;
varying vec3 vLightRay;
varying vec3 vEyeVec;
varying vec2 vTextureCoord;

void main(void){
  vec4 vertex = ModelViewMatrix * vec4(aVertexPosition, 1.0);

  vNormal = vec3(NormalMatrix * vec4(aVertexNormal, 1.0));

  vec4 light = ModelViewMatrix * vec4(uLightPosition, 1.0);

  vLightRay = vertex.xyz - light.xyz;

  vEyeVec = -vec3(vertex.xyz);

  gl_Position = ProjectionMatrix * ModelViewMatrix * vec4(aVertexPosition, 1.0);

  vTextureCoord = aVertexTextureCoords;
}
