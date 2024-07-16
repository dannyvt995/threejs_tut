import {
	Color,
	Matrix4,
	Mesh,
	PerspectiveCamera,
	Plane,
	ShaderMaterial,
	UniformsUtils,
	Vector3,
	Vector4,
	WebGLRenderTarget,
	HalfFloatType,
	ShaderChunk, ShaderLib
} from 'three';

class Reflector extends Mesh {

	constructor( geometry, options = {} ) {

		super( geometry );

		this.isReflector = true;

		this.type = 'Reflector';
		this.camera = new PerspectiveCamera();

		const scope = this;

		const color = ( options.color !== undefined ) ? new Color( options.color ) : new Color( 0x7F7F7F );
		const textureWidth = options.textureWidth || 512;
		const textureHeight = options.textureHeight || 512;
		const clipBias = options.clipBias || 0;
		const shader = options.shader || Reflector.ReflectorShader;
		const multisample = ( options.multisample !== undefined ) ? options.multisample : 4;

		const WIDTH = 128
		const BOUNDS = 20;
		//

		const reflectorPlane = new Plane();
		const normal = new Vector3();
		const reflectorWorldPosition = new Vector3();
		const cameraWorldPosition = new Vector3();
		const rotationMatrix = new Matrix4();
		const lookAtPosition = new Vector3( 0, 0, - 1 );
		const clipPlane = new Vector4();

		const view = new Vector3();
		const target = new Vector3();
		const q = new Vector4();

		const textureMatrix = new Matrix4();
		const virtualCamera = this.camera;

		const renderTarget = new WebGLRenderTarget( textureWidth, textureHeight, { samples: multisample, type: HalfFloatType } );

		const material = new ShaderMaterial( {
			name: ( shader.name !== undefined ) ? shader.name : 'unspecified',
			uniforms: UniformsUtils.clone( shader.uniforms ),
			fragmentShader: shader.fragmentShader,
			vertexShader: shader.vertexShader,
			transparent:true,
			opacity:.2,
			wireframe:false,
			side:2,
			fog:true
		} );
		console.log(material)

		 material.uniforms[ 'textureMatrix' ].value = textureMatrix;
	

          
        material.lights = true;

            // Material attributes from THREE.MeshPhongMaterial
            // Sets the uniforms with the material values
         
        

            // Defines
            material.defines.WIDTH = WIDTH.toFixed(1);
            material.defines.BOUNDS = BOUNDS.toFixed(1);
		this.material = material;

		this.onBeforeRender = function ( renderer, scene, camera ) {
			
			reflectorWorldPosition.setFromMatrixPosition( scope.matrixWorld );
			cameraWorldPosition.setFromMatrixPosition( camera.matrixWorld );

			rotationMatrix.extractRotation( scope.matrixWorld );

			normal.set( 0, 0, 1 );
			normal.applyMatrix4( rotationMatrix );

			view.subVectors( reflectorWorldPosition, cameraWorldPosition );

			// Avoid rendering when reflector is facing away

			if ( view.dot( normal ) > 0 ) return;

			view.reflect( normal ).negate();
			view.add( reflectorWorldPosition );

			rotationMatrix.extractRotation( camera.matrixWorld );

			lookAtPosition.set( 0, 0, - 1 );
			lookAtPosition.applyMatrix4( rotationMatrix );
			lookAtPosition.add( cameraWorldPosition );

			target.subVectors( reflectorWorldPosition, lookAtPosition );
			target.reflect( normal ).negate();
			target.add( reflectorWorldPosition );

			virtualCamera.position.copy( view );
			virtualCamera.up.set( 0, 1, 0 );
			virtualCamera.up.applyMatrix4( rotationMatrix );
			virtualCamera.up.reflect( normal );
			virtualCamera.lookAt( target );

			virtualCamera.far = camera.far; // Used in WebGLBackground

			virtualCamera.updateMatrixWorld();
			virtualCamera.projectionMatrix.copy( camera.projectionMatrix );

			// Update the texture matrix
			textureMatrix.set(
				0.5, 0.0, 0.0, 0.5,
				0.0, 0.5, 0.0, 0.5,
				0.0, 0.0, 0.5, 0.5,
				0.0, 0.0, 0.0, 1.0
			);
			textureMatrix.multiply( virtualCamera.projectionMatrix );
			textureMatrix.multiply( virtualCamera.matrixWorldInverse );
			textureMatrix.multiply( scope.matrixWorld );
			
			// Now update projection matrix with new clip plane, implementing code from: http://www.terathon.com/code/oblique.html
			// Paper explaining this technique: http://www.terathon.com/lengyel/Lengyel-Oblique.pdf
			reflectorPlane.setFromNormalAndCoplanarPoint( normal, reflectorWorldPosition );
			reflectorPlane.applyMatrix4( virtualCamera.matrixWorldInverse );

			clipPlane.set( reflectorPlane.normal.x, reflectorPlane.normal.y, reflectorPlane.normal.z, reflectorPlane.constant );

			const projectionMatrix = virtualCamera.projectionMatrix;

			q.x = ( Math.sign( clipPlane.x ) + projectionMatrix.elements[ 8 ] ) / projectionMatrix.elements[ 0 ];
			q.y = ( Math.sign( clipPlane.y ) + projectionMatrix.elements[ 9 ] ) / projectionMatrix.elements[ 5 ];
			q.z = - 1.0;
			q.w = ( 1.0 + projectionMatrix.elements[ 10 ] ) / projectionMatrix.elements[ 14 ];

			// Calculate the scaled plane vector
			clipPlane.multiplyScalar( 2.0 / clipPlane.dot( q ) );

			// Replacing the third row of the projection matrix
			projectionMatrix.elements[ 2 ] = clipPlane.x;
			projectionMatrix.elements[ 6 ] = clipPlane.y;
			projectionMatrix.elements[ 10 ] = clipPlane.z + 1.0 - clipBias;
			projectionMatrix.elements[ 14 ] = clipPlane.w;

			// Render
			//scope.visible = false;

			// const currentRenderTarget = renderer.getRenderTarget();

			// const currentXrEnabled = renderer.xr.enabled;
			// const currentShadowAutoUpdate = renderer.shadowMap.autoUpdate;

			// renderer.xr.enabled = false; // Avoid camera modification
			// renderer.shadowMap.autoUpdate = false; // Avoid re-computing shadows

			// renderer.setRenderTarget( renderTarget );

			// renderer.state.buffers.depth.setMask( true ); // make sure the depth buffer is writable so it can be properly cleared, see #18897

			// if ( renderer.autoClear === false ) renderer.clear();
			// renderer.render( scene, virtualCamera );

			// renderer.xr.enabled = currentXrEnabled;
			// renderer.shadowMap.autoUpdate = currentShadowAutoUpdate;

			// renderer.setRenderTarget( currentRenderTarget );

			// Restore viewport
	
			const viewport = camera.viewport;

			if ( viewport !== undefined ) {

				//renderer.state.viewport( viewport );

			}

			scope.visible = true;

		};

		this.getRenderTarget = function () {

			return renderTarget;

		};
		this.getCamera = function () {

			return virtualCamera;

		};
		this.dispose = function () {

			//renderTarget.dispose();
			scope.material.dispose();

		};

	}

}

Reflector.ReflectorShader = {

	name: 'ReflectorShader',
	uniforms: UniformsUtils.merge([ ShaderLib.phong.uniforms, {
	'uTime': {
			value: null
		},

		'color': {
			value: new Color(0x00000)
		},

		'tDiffuse': {
			value: null
		},

		'textureMatrix': {
			value: null
		},

		'diffuse' : {
			value: new Color(0x00000)
		},
		'specular' : {
			value: new Color(0x323232)
		},
		'shininess' : {
			value: Math.max(50, 1e-4)
		},
		'opacity' : {
			value: .5
		},
		'tHeightMap' : {
			value: null
		}
		
		,'ambientLightColor' : {
			value: new Color(0xffffff)
		},
		//uniform cho fog 
		// lích haot5 fog thủ công 
		'topColor' : {
			value: new Color( 0x0077ff ) 
		},
		'bottomColor' : {
			value: new Color( 0xffffff ) 
		},
		'exponent' : {
			value: .6
		},
		'offset' : {
			value: 1
		},
		'opacity' : {
			value: 1
		},
		'fogColor' : {
			value: new Color(0xffffff)
		},
		'fogNear' : {
			value: 0
		},
		'fogFar' : {
			value: 0.1
		}
	  }]),




	vertexShader: /* glsl */`
	
		#define PHONG
		uniform mat4 textureMatrix;
		varying vec4 vUv;
		varying vec2 vUvOrgin;
		varying vec3 vViewPosition;
		uniform float uTime;
		uniform sampler2D tHeightMap;

 
		#include <common>
		#include <batching_pars_vertex>
		#include <uv_pars_vertex>
		#include <displacementmap_pars_vertex>
		#include <envmap_pars_vertex>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <normal_pars_vertex>
		#include <morphtarget_pars_vertex>
		#include <skinning_pars_vertex>
		#include <shadowmap_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>
		
		void main() {
		
				vec2 cellSize = vec2( 1.0 /WIDTH, 1.0 / WIDTH );

				#include <uv_vertex>
				#include <color_vertex>

				// # include <beginnormal_vertex>
				// Compute normal from heightmap
				vec3 objectNormal = vec3(
					( texture2D( tHeightMap, uv + vec2( - cellSize.x, 0 ) ).x - texture2D( tHeightMap, uv + vec2( cellSize.x, 0 ) ).x ) * WIDTH / BOUNDS,
					( texture2D( tHeightMap, uv + vec2( 0, - cellSize.y ) ).x - texture2D( tHeightMap, uv + vec2( 0, cellSize.y ) ).x ) * WIDTH / BOUNDS,
					1.0 );
				//<beginnormal_vertex>

				#include <morphnormal_vertex>
				#include <skinbase_vertex>
				#include <skinnormal_vertex>
				#include <defaultnormal_vertex>

			#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED

				vNormal = normalize( transformedNormal );

			#endif

				//# include <begin_vertex>
				float heightValue = texture2D( tHeightMap, uv ).x;
				vec3 transformed = vec3( position.x, position.y, heightValue / 5.);
		
				//<begin_vertex>

				#include <morphtarget_vertex>
				#include <skinning_vertex>
				#include <displacementmap_vertex>
				#include <project_vertex>
				#include <logdepthbuf_vertex>
				#include <clipping_planes_vertex>

				vViewPosition = - mvPosition.xyz;
				vUv = textureMatrix * vec4( transformed, 1.0 );
				vUvOrgin = uv;
				#include <worldpos_vertex>
				#include <envmap_vertex>
				#include <shadowmap_vertex>

				#include <fog_vertex>
		


		}`,
	//fragmentShader: ShaderChunk['meshphong_frag'],
	fragmentShader: /* glsl */`
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		varying vec4 vUv;
	
		uniform vec3 diffuse;
		uniform vec3 emissive;
		uniform vec3 specular;
		uniform float shininess;
		uniform float opacity;
		#include <common>
		#include <packing>
		#include <dithering_pars_fragment>
		#include <color_pars_fragment>
		#include <uv_pars_fragment>
		#include <map_pars_fragment>
		#include <alphamap_pars_fragment>
		#include <alphatest_pars_fragment>
		#include <alphahash_pars_fragment>
		#include <aomap_pars_fragment>
		#include <lightmap_pars_fragment>
		#include <emissivemap_pars_fragment>
		#include <envmap_common_pars_fragment>
		#include <envmap_pars_fragment>
		#include <fog_pars_fragment>
		#include <bsdfs>
		#include <lights_pars_begin>
		#include <normal_pars_fragment>
		#include <lights_phong_pars_fragment>
		#include <shadowmap_pars_fragment>
		#include <bumpmap_pars_fragment>
		#include <normalmap_pars_fragment>
		#include <specularmap_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {
			vec4 base = texture2DProj( tDiffuse, vUv );
			vec4 diffuseColor = vec4( diffuse, opacity );
			#include <clipping_planes_fragment>
			ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
			vec3 totalEmissiveRadiance = emissive;
			#include <logdepthbuf_fragment>
			#include <map_fragment>
			#include <color_fragment>
			#include <alphamap_fragment>
			#include <alphatest_fragment>
			#include <alphahash_fragment>
			#include <specularmap_fragment>
			#include <normal_fragment_begin>
			#include <normal_fragment_maps>
			#include <emissivemap_fragment>
			#include <lights_phong_fragment>
			#include <lights_fragment_begin>
			#include <lights_fragment_maps>
			#include <lights_fragment_end>
			#include <aomap_fragment>
			vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
			outgoingLight += blendOverlay(mix(base.rgb, vec3(0.), 0.5), vec3(1., 1., 1.));



			#include <envmap_fragment>
			#include <opaque_fragment>
			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>
			#include <dithering_fragment>

			gl_FragColor = vec4(outgoingLight,.5);
	

		}`
};

export { Reflector };