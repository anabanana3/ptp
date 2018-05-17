
#ifdef GL_ES
precision highp float;
#endif

//uniform float uShininess;

uniform vec3 uLightDirection;
//uniform vec3 uLightPosition;
uniform vec4 uLightAmbient;
uniform vec4 uLightDiffuse;
//uniform vec4 uLightSpecular;

uniform vec4 uMaterialAmbient;
uniform vec4 uMaterialDiffuse;
//uniform vec4 uMaterialSpecular;
//uniform sampler2D uSampler;//no se usa

varying vec3 vNormal;
varying vec3 vEyeVec;
//varying vec2 vTextureCoord; //no se usa
// varying vec4 vFinalColor;

void main(void)
{
 	vec3 L = normalize(uLightDirection);	//Directional light
	//vec3 L = normalize(uLightPosition);	//Positional light
	vec3 N = normalize(vNormal);

	float lambertTerm = dot(N,-L);

	vec4 Ia = uLightAmbient * uMaterialAmbient;
	vec4 Id = vec4(0.0, 0.0, 0.0, 1.0);
	//vec4 Is = vec4(0.0, 0.0, 0.0, 1.0);


	if(lambertTerm > 0.0){
		Id = uLightDiffuse * uMaterialDiffuse * lambertTerm;

		vec3 E = normalize(vEyeVec);
		vec3 R = reflect(L, N);
	//	float specular = max(dot(R, E), 0.0);
	//	Is = uLightSpecular * uMaterialSpecular * specular;
	}
	vec4 finalColor = Ia + Id;


	//Fuente: http://www.lighthouse3d.com/tutorials/glsl-12-tutorial/toon-shading-version-iii/
		float intensity = dot(vec3(L), N);

		if (intensity > 0.3){
			finalColor = vec4(0.9824, 0.8, 0.7, 1.0) * 0.5;
		}
		// else if (intensity > 0.4){
		// 	finalColor.r = finalColor.r * 0.95;
 		// 	finalColor.g = finalColor.g * 0.95;
 		// 	finalColor.b = finalColor.b * 0.95;
		// }
		else if (intensity > -0.3){
			finalColor = vec4(0.9824, 0.8, 0.7, 1.0);
		}
		else if (intensity > -0.85){
			finalColor = vec4(0.9824, 0.8, 0.7, 1.0) * 1.06;
		}
	 	else{
			finalColor = vec4(0.9824, 0.8, 0.7, 1.0) * 1.15;
			// if(finalColor.r > 0.8) finalColor.r = finalColor.r;
			// else if(finalColor.r > 0.5) finalColor.r = finalColor.r * 1.1;
			// else if(finalColor.r > 0.0) finalColor.r = finalColor.r * 1.5;


		}
		// finalColor = finalColor;


	finalColor.a = 1.0;
	//gl_FragColor = finalColor;
	gl_FragColor = finalColor;
}
