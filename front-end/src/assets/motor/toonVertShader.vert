
//En este archivo simplemente hemos borrado el codigo que tenía que ver con las
// texturas, ya que solo usamos el material y unicamente usamos la luz ambiental

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;

uniform mat4 ModelViewMatrix;
uniform mat4 ProjectionMatrix;
uniform mat4 NormalMatrix;

uniform vec3 uLightDirection; //Directional light
uniform vec4 uLightAmbient;

varying vec4 vFinalColor;
varying vec3 vNormal;
varying vec3 vLightRay;
varying vec3 vEyeVec;

void main(void){
  vec4 vertex = ModelViewMatrix * vec4(aVertexPosition, 1.0);

  vNormal = vec3(NormalMatrix * vec4(aVertexNormal, 1.0));

  vec4 light = ModelViewMatrix * vec4(uLightDirection, 1.0);

  vLightRay = vertex.xyz - light.xyz;

  vEyeVec = -vec3(vertex.xyz);

  gl_Position = ProjectionMatrix * ModelViewMatrix * vec4(aVertexPosition, 1.0);

}
