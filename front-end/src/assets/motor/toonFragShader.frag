
#ifdef GL_ES
precision highp float;
#endif

//Para el cartoon solo usamos la luz direccional y luz y material ambiental
uniform vec3 uLightDirection;
uniform vec4 uLightAmbient;

uniform vec4 uMaterialAmbient;

varying vec3 vNormal;
varying vec3 vEyeVec;

void main(void)
{
 	vec3 L = normalize(uLightDirection);	//Directional light
	vec3 N = normalize(vNormal);

	vec4 Ia = uLightAmbient * uMaterialAmbient;

  //el color final es la multiplicacion de la luz y material ambiental, sin
  //tener en cuenta la difusa ni la especular
	vec4 finalColor = Ia;


	//Fuente: http://www.lighthouse3d.com/tutorials/glsl-12-tutorial/toon-shading-version-iii/
  //Aqui comprobamos si el color es mas claro o mas oscuro, separando por cuatro
  //franjas distintas de tonalidades y adjudicando un tono comun del material
		float intensity = dot(vec3(L), N);

		if (intensity > 0.3){             //tono mas oscuro
			finalColor = finalColor * 0.5;
		}
		else if (intensity > -0.3){
			finalColor = finalColor * 1.0;
		}
		else if (intensity > -0.85){
			finalColor = finalColor * 1.06;
		}
	 	else{                              //tono mas claro
			finalColor = finalColor * 1.15;
		}

//finalmente ponemos la transparencia a 1.0 
	finalColor.a = 1.0;
	gl_FragColor = finalColor;
}
