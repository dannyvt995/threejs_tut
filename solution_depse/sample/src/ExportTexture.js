import * as THREE from "three";
export  class ExportTexture {
    constructor(parameters) {
        this.parameters = parameters;
        console.log(this.parameters.texture)
        this.ratio = 1.5
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(window.innerWidth / - this.ratio, window.innerWidth / this.ratio, window.innerHeight / this.ratio, window.innerHeight / - this.ratio, -100000, 100000);

        this.geometry = new THREE.PlaneGeometry(700,700)
        this.material = new THREE.ShaderMaterial({
            uniforms: {
              uTextureSnap: { value: this.parameters.texture }, 
            },
            vertexShader: `
              varying vec2 vUv;
              void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `,
            fragmentShader: `
              uniform sampler2D uTextureSnap;
              varying vec2 vUv;
              void main() {
                gl_FragColor = texture2D(uTextureSnap, vUv);
              //  gl_FragColor = vec4(vUv,0.,1.);
              }
            `,
        });

        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);

    }

    layerRender() {
       
        this.parameters.renderer.render(this.scene, this.camera);
    }
}