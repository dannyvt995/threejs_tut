import { ShaderMaterial,Vector2,ClampToEdgeWrapping } from 'three';

export class RenderSDFLayerMaterial extends ShaderMaterial {

	constructor(params) {

		super({

			defines: {

				DISPLAY_GRID: 0,

			},

			uniforms: {

				sdfTex: { value: null },
				layer: { value: 0 },
				layers: { value: 0 },
				uTexelSize : {value:new Vector2(0,0)}
			},
			vertexShader: /* glsl */`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}

			`,

			fragmentShader: /* glsl */`
				precision highp sampler3D;

				varying vec2 vUv;
				uniform sampler3D sdfTex;
				uniform float layer;
				uniform float layers;
				uniform vec2 uTexelSize;
				
				void main() {

					#if DISPLAY_GRID

					float dim = ceil( sqrt( layers ) );
					vec2 cell = floor( vUv * dim );
					vec2 frac = vUv * dim - cell;
					float zLayer = ( cell.y * dim + cell.x ) / ( dim * dim );

					float dist = texture( sdfTex, vec3( frac, zLayer ) ).r;
				
					// gl_FragColor.rgb = dist > 0.0 ? vec3( 0, dist, 0 ) : vec3( - dist, 0, 0 );
					// gl_FragColor.a = 1.0;


					 // Get gradient base sdf
				
					vec3 texelSize = vec3(uTexelSize,uTexelSize.x); 

					float sdfRight = texture(sdfTex, vec3(frac + vec2(texelSize.x, 0.0), zLayer)).r;
					float sdfLeft  = texture(sdfTex, vec3(frac - vec2(texelSize.x, 0.0), zLayer)).r;
					float sdfUp    = texture(sdfTex, vec3(frac + vec2(0.0, texelSize.y), zLayer)).r;
					float sdfDown  = texture(sdfTex, vec3(frac - vec2(0.0, texelSize.y), zLayer)).r;

					float gradX = (sdfRight - sdfLeft) * 0.5;
					float gradY = (sdfUp - sdfDown) * 0.5;

					float sdfFront = texture(sdfTex, vec3(frac, zLayer + texelSize.z)).r;
					float sdfBack  = texture(sdfTex, vec3(frac, zLayer - texelSize.z)).r;

					float gradZ = (sdfFront - sdfBack) * 0.5;

					vec3 gradient = vec3(gradX, gradY, gradZ) ;

					gradient = normalize(gradient);

					// out clr
					// up color gradient
			

					vec3 outGradient2 = vec3(gradient * 0.5 + 0.5);
					outGradient2.r = outGradient2.r * 0.6; // Giảm màu đỏ xuống 50%
					outGradient2.g = outGradient2.g * 1.1; // Tăng màu xanh lá cây lên 150%
					outGradient2.b = outGradient2.b * 1.1; // Tăng màu xanh dương lên 150%


					// Đảm bảo không vượt quá 1.0
					outGradient2 = pow(outGradient2, vec3(1.5)); 
					outGradient2 = clamp(outGradient2, 0.0, 1.0);

					gl_FragColor = vec4(outGradient2, step(.95,1.-dist));
					gl_FragColor = vec4(gradient *.5+.5,dist );
//gl_FragColor = vec4(dist);
// gl_FragColor = vec4(vec3(dist),step(.4,1.-dist));



					// vec3 infoOrigin = texture( sdfTex, vec3( frac, zLayer ) ).rgb;
					// gl_FragColor.rgb = step(.02,infoOrigin);
					// gl_FragColor.rgb = infoOrigin;
					// gl_FragColor.a = 1.0;





				
					#else

				

					 // Get gradient base sdf
		
					vec3 texelSize = vec3(uTexelSize,uTexelSize.x); 


					vec2 clampedUV1 = clamp(vUv + vec2(texelSize.x, 0.0), 0.0, 1.);
					vec2 clampedUV2 = clamp(vUv - vec2(texelSize.x, 0.0), 0.0, 1.);
					vec2 clampedUV3 = clamp(vUv + vec2(0.0, texelSize.y), 0.0, 1.);
					vec2 clampedUV4 = clamp(vUv - vec2(0.0, texelSize.y), 0.0, 1.);

					float sdfRight = texture(sdfTex, vec3(clampedUV1, layer)).r;
					float sdfLeft  = texture(sdfTex, vec3(clampedUV2, layer)).r;
					float sdfUp    = texture(sdfTex, vec3(clampedUV3, layer)).r;
					float sdfDown  = texture(sdfTex, vec3(clampedUV4, layer)).r;

					float gradX = (sdfRight - sdfLeft) * 0.5;
					float gradY = (sdfUp - sdfDown) * 0.5;

					
					float sdfFront = texture(sdfTex, vec3(vUv, layer + texelSize.z)).r;
					float sdfBack  = texture(sdfTex, vec3(vUv, layer - texelSize.z)).r;

					float gradZ = (sdfFront - sdfBack) * 0.5;

					vec3 gradient = vec3(gradX, gradY, gradZ);

					gradient = normalize(gradient);

					
				
					vec3 outGradient2 = vec3(gradient * 0.5 + 0.5);
					outGradient2.r = outGradient2.r * 0.6; // Giảm màu đỏ xuống 50%
					outGradient2.g = outGradient2.g * 1.1; // Tăng màu xanh lá cây lên 150%
					outGradient2.b = outGradient2.b * 1.1; // Tăng màu xanh dương lên 150%

					// Đảm bảo không vượt quá 1.0
					outGradient2 = pow(outGradient2, vec3(1.5)); 
					outGradient2 = clamp(outGradient2, 0.0, 1.0);

					gl_FragColor = vec4(outGradient2, 1.);
				



					float dist = texture( sdfTex, vec3( vUv, layer ) ).r;
					vec3 distanceOut = 	 dist > 0.0 ? vec3( 0, dist, 0 ) : vec3( - dist, 0, 0 );
			
					//gl_FragColor = vec4(distanceOut,1.);
	
	
					#endif

					#include <colorspace_fragment>

				}
			`

		});

		this.setValues(params);

	}

}