/*#version 100
precision mediump float;

varying vec3 Position; //VERTICES EN COORDINADAS DE VISTA
varying vec3 Normal; //NORMAL EN COORDENADAS DE VISTA
varying vec2 TexCoords; //COORDENADAS DE TEXTURA

uniform vec4 color;

uniform vec4 LightPosition; //POSICIÓN DE LA LUZ EN COORDENADAS DE VISTA
uniform vec3 LightIntensity; //INTENSIDAD DE LA LUZ

uniform sampler2D uSampler;
uniform sampler2D Kd; //COMPONENTE DIFUSA DEL MATERIAL
uniform sampler2D Ka; //COMPONENTE AMBIENTAL DEL MATERIAL
uniform sampler2D Ks; //COMPONENTE ESPECULAR DEL MATERIAL

uniform vec3 Ld; //COMPONENTE DIFUSA DE LA LUZ
uniform vec3 La; //COMPONENTE AMBIENTAL DE LA LUZ
uniform vec3 Ls; //COMPONENTE ESPECULAR DE LA LUZ

uniform float Shininess;

vec4 FragColor;

// FUNCION QUE CALCULA EL MODELO DE PHONG
vec3 Phong () {
	vec3 n = normalize (Normal);
	vec3 s = normalize (vec3 (LightPosition) - Position);
	vec3 v = normalize (-Position);
	vec3 r = reflect (-s, n);
	//componente AMBIENTAL
	vec3 Ambient =  La * vec3(texture2D(uSampler, TexCoords));
 	vec3 Diffuse = Ld * max(dot(s, n), 0.0) * vec3(texture2D(Kd, TexCoords));
	vec3 Specular = Ls * pow(max(dot(r, v), 0.0), Shininess) * vec3(texture2D(Ks, TexCoords));

	// vec3 light = LightIntensity * (Ka + Kd * max (dot (n, s), 0.0) + Ks * pow (max (dot (r, v), 0.0), Shininess));
	vec3 light = Ambient + Diffuse + Specular;

	return light;
}

void main () {
// CALCULAR EL COLOR DEL FRAGMENTO
	FragColor = vec4 (Phong(), 1.0);
	// gl_FragColor = FragColor;
	gl_FragColor = FragColor;
}
*/
#ifdef GL_ES
precision highp float;
#endif

uniform float uShininess;

uniform vec3 uLightDirection;
uniform vec4 uLightAmbient;
uniform vec4 uLightDiffuse;
uniform vec4 uLightSpecular;

uniform vec4 uMaterialAmbient;
uniform vec4 uMaterialDiffuse;
uniform vec4 uMaterialSpecular;

varying vec3 vNormal;
varying vec3 vEyeVec;
// varying vec4 vFinalColor;

void main(void)
{
	vec3 L = normalize(uLightDirection);
	vec3 N = normalize(vNormal);

	float lambertTerm = dot(N,-L);

	vec4 Ia = uLightAmbient * uMaterialAmbient;
	vec4 Id = vec4(0.0, 0.0, 0.0, 1.0);
	vec4 Is = vec4(0.0, 0.0, 0.0, 1.0);

	if(lambertTerm > 0.0){
		Id = uLightDiffuse * uMaterialDiffuse * lambertTerm;

		vec3 E = normalize(vEyeVec);
		vec3 R = reflect(L, N);
		float specular = pow(max(dot(R, E), 0.0), uShininess);

		Is = uLightSpecular * uMaterialSpecular * specular;
	}
	vec4 finalColor = Ia + Id + Is;
	finalColor.a = 1.0;
	gl_FragColor = finalColor;
}
