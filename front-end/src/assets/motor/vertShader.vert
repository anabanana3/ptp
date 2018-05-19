attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aVertexTextureCoords;

uniform mat4 ModelViewMatrix;
uniform mat4 ProjectionMatrix;
uniform mat4 NormalMatrix;

uniform vec3 uLightDirection; //Directional light
uniform vec3 uLightPosition; //Positional light
uniform vec3 uLight;
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
