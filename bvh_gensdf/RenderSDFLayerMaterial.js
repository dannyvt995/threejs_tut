import { ShaderMaterial,Vector2 } from 'three';

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
				uTexelSize : {value:new Vector2(1/20,1/20)}
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
				vec3 gradientColor(float value) {
					return vec3(0.5 + 0.5 * value, 0.5 - 0.5 * value, 0.0);
				}
				void main() {

					#if DISPLAY_GRID

					float dim = ceil( sqrt( layers ) );
					vec2 cell = floor( vUv * dim );
					vec2 frac = vUv * dim - cell;
					float zLayer = ( cell.y * dim + cell.x ) / ( dim * dim );

					float dist = texture( sdfTex, vec3( frac, zLayer ) ).r;
				
					gl_FragColor.rgb = dist > 0.0 ? vec3( 0, dist, 0 ) : vec3( - dist, 0, 0 );
					gl_FragColor.a = 1.0;


					 // Get gradient base sdf
					float sdfCenter = texture(sdfTex, vec3(vUv, layer)).r;
					vec3 texelSize = vec3(uTexelSize, 1.0 / float(textureSize(sdfTex, 0).z)); 

					float sdfRight = texture(sdfTex, vec3(frac + vec2(texelSize.x, 0.0), zLayer)).r;
					float sdfLeft  = texture(sdfTex, vec3(frac - vec2(texelSize.x, 0.0), zLayer)).r;
					float sdfUp    = texture(sdfTex, vec3(frac + vec2(0.0, texelSize.y), zLayer)).r;
					float sdfDown  = texture(sdfTex, vec3(frac - vec2(0.0, texelSize.y), zLayer)).r;

					float gradX = (sdfRight - sdfLeft) * 0.5;
					float gradY = (sdfUp - sdfDown) * 0.5;

					float sdfFront = texture(sdfTex, vec3(frac, zLayer + texelSize.z)).r;
					float sdfBack  = texture(sdfTex, vec3(frac, zLayer - texelSize.z)).r;

					float gradZ = (sdfFront - sdfBack) * 0.5;

					vec3 gradient = vec3(gradX, gradY, gradZ);

					gradient = normalize(gradient);

					// out clr
					// up color gradient
					float gradientMagnitude = length(gradient);

				
					vec3 outGradient = vec3(0.0);
					if (gradientMagnitude > 0.0) {
						
						outGradient = gradient * 0.5 + 0.5; // Chuyển đổi [-1, 1] thành [0, 1]
						
						outGradient = pow(outGradient, vec3(2.0)); 
						outGradient = mix(vec3(0.0), outGradient, 0.8); 
					}
					vec3 distanceOut = dist > 0.0 ? vec3( dist ) : vec3( - dist );
				
					vec3 combine2 = outGradient * 1. + distanceOut * 0.;
		

					gl_FragColor = vec4(combine2, 1.0);
					#else

					float dist = texture( sdfTex, vec3( vUv, layer ) ).r;

					 // Get gradient base sdf
					float sdfCenter = texture(sdfTex, vec3(vUv, layer)).r;
					vec3 texelSize = vec3(uTexelSize, 1.0 / float(textureSize(sdfTex, 0).z)); 

					float sdfRight = texture(sdfTex, vec3(vUv + vec2(texelSize.x, 0.0), layer)).r;
					float sdfLeft  = texture(sdfTex, vec3(vUv - vec2(texelSize.x, 0.0), layer)).r;
					float sdfUp    = texture(sdfTex, vec3(vUv + vec2(0.0, texelSize.y), layer)).r;
					float sdfDown  = texture(sdfTex, vec3(vUv - vec2(0.0, texelSize.y), layer)).r;

					float gradX = (sdfRight - sdfLeft) * 0.5;
					float gradY = (sdfUp - sdfDown) * 0.5;

					float sdfFront = texture(sdfTex, vec3(vUv, layer + texelSize.z)).r;
					float sdfBack  = texture(sdfTex, vec3(vUv, layer - texelSize.z)).r;

					float gradZ = (sdfFront - sdfBack) * 0.5;

					vec3 gradient = vec3(gradX, gradY, gradZ);

					gradient = normalize(gradient);

					// out clr
					// up color gradient
					float gradientMagnitude = length(gradient);

				
					vec3 outGradient = vec3(0.0);
					if (gradientMagnitude > 0.0) {
						
						outGradient = gradient * 0.5 + 0.5; // Chuyển đổi [-1, 1] thành [0, 1]
						
						outGradient = pow(outGradient, vec3(2.0)); 
						outGradient = mix(vec3(0.0), outGradient, 0.8); 
					}
					vec3 distanceOut = dist > 0.0 ? vec3( dist ) : vec3( - dist );
				
					vec3 combine2 = outGradient * 1. + distanceOut * 0.;
		

					gl_FragColor = vec4(combine2, 1.0);

					#endif

					#include <colorspace_fragment>

				}
			`

		});

		this.setValues(params);

	}

}