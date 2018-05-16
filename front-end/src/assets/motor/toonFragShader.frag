
#ifdef GL_ES
precision highp float;
#endif

uniform float uShininess;

uniform vec3 uLightDirection;
uniform vec3 uLightPosition;
uniform vec4 uLightAmbient;
uniform vec4 uLightDiffuse;
uniform vec4 uLightSpecular;

uniform vec4 uMaterialAmbient;
uniform vec4 uMaterialDiffuse;
uniform vec4 uMaterialSpecular;
uniform sampler2D uSampler;

varying vec3 vNormal;
varying vec3 vEyeVec;
varying vec2 vTextureCoord;

void main(void)
{
	vec3 L = normalize(uLightPosition);	//Positional light
	vec3 N = normalize(vNormal);

	float lambertTerm = dot(N,-L);

	vec4 Ia = uLightAmbient * uMaterialAmbient;
	vec4 Is = vec4(0.0, 0.0, 0.0, 1.0);
	vec4 Id = vec4(0.0, 0.0, 0.0, 1.0);

	if(lambertTerm > 0.0){
		Id = uLightDiffuse * uMaterialDiffuse * lambertTerm;

		vec3 E = normalize(vEyeVec);
		vec3 R = reflect(L, N);
		float specular = pow(max(dot(R, E), 0.0), uShininess);


		Is = uLightSpecular * (0.5, 0.3, 0.3, 1.0) * specular;
	}

	vec4 finalColor = Ia + Id + Is;
//	finalColor.r = 1.0;
  //finalColor.g = 0.4;
  //finalColor.b = 0.7;
  //finalColor.a = 1.0;

	gl_FragColor = finalColor * texture2D(uSampler, vTextureCoord);
}
