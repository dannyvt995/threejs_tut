import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/GLTFLoader.js';
import { vertexInstanceBuddle,fragmentInstanceBuddle } from './glsl/whale.js';


export class WhaleScene {
  constructor(parameters) {
    this.parameters = parameters;
    this.scene = this.parameters.scene;
    this.camera = this.parameters.camera;
    this.renderer = this.parameters.renderer;

    this.modelRef = null;
    this.pointMeshRef = null;
    this.uniforms = {};
    this.particlesPosition = [];
    this.propsSizeAttribute = [];
    this.propsColorAttribute = [];
    this.whaleSectionProgress = 0;
    this.viewport = { width: 800, height: 600 }; // Assuming default values for viewport dimensions
    this.modelWhale = null;
    this.clonedObjectWhale = null;
    this.loader = new GLTFLoader();
    this.initialize()
 
  }

  initialize() {
    // Load GLTF model
    this.loader.load(
      './models/whale_org1.gltf',
      (gltf) => {
        this.modelRef = gltf.scene.children[0];
        this.modelRef.scale.set(1, 1, 1);
       
        this.clonedObjectWhale = this.modelRef.clone();

        this.uniforms = {
          uTime: { value: 0.0 },
          uProgress: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          diffScroll: { value: 0 },
          resolution: { value: new THREE.Vector2(this.viewport.width, this.viewport.height) },
        };

        this.particlesPosition = this.computeParticlesPosition();
        this.propsSizeAttribute = this.computePropsSizeAttribute();
        this.propsColorAttribute = this.computePropsColorAttribute();
        this.initScene()
      },
      undefined,
      (error) => {
        console.error('Error loading GLTF model:', error);
      }
    );
  }

  computeParticlesPosition() {
    let val = new Float32Array();
    if (this.modelRef) {
      this.modelRef.geometry.center();
      const a = this.modelRef.geometry.clone();
      const positionAttribute = a.getAttribute('position');
      val = positionAttribute.array;

      const scaleItReponsive = this.viewport.width / 1.2;
      const rotPos = new Float32Array(val.length);
      const rotX = new THREE.Matrix4().makeRotationX(Math.PI * -0.3);
      const rotY = new THREE.Matrix4().makeRotationY(Math.PI * -0.01);
      const rotZ = new THREE.Matrix4().makeRotationY(Math.PI * 0.2);

      for (let i = 0; i < val.length; i += 3) {
        const vertex = new THREE.Vector3(val[i], val[i + 1], val[i + 2]);
        vertex.applyMatrix4(rotX);
        vertex.applyMatrix4(rotY);
        vertex.applyMatrix4(rotZ);

        rotPos[i] = (vertex.x - this.viewport.width / 1.2) * scaleItReponsive;
        if (vertex.y < 0.01) {
          rotPos[i + 1] = (vertex.y * 1.4 - (this.viewport.height / 1.4) * 1) * scaleItReponsive;
        } else {
          rotPos[i + 1] = (vertex.y - (this.viewport.height / 1.4) * 1) * scaleItReponsive;
        }
        rotPos[i + 2] = (vertex.z - 1.5) * scaleItReponsive;
      }
      val = rotPos;
    }
    return val;
  }

  computePropsSizeAttribute() {
    let val = new Float32Array();
    if (this.modelRef) {
      const positionAttribute = this.modelRef.geometry.getAttribute('position');
      val = new Float32Array(positionAttribute.array.length);
      for (let i = 0; i < positionAttribute.array.length; i += 3) {
        val[i] = 0.1 + Math.random() * 0.9; //size
        val[i + 1] = 0.1 + Math.random() * 0.9; // clr1
        val[i + 2] = 0.1 + Math.random() * 0.9; // clr2
      }
    }
    return val;
  }

  computePropsColorAttribute() {
    let val = new Float32Array();
    if (this.modelRef) {
      const colorList = [
        [214, 251, 253],
        [14, 103, 146],
        [48, 164, 203],
        [214, 254, 255],
      ];
      const normalizedColorList = colorList.map((rgbValues) =>
        rgbValues.map((value) => value / 255)
      );

      const positionAttribute = this.modelRef.geometry.getAttribute('position');
      val = new Float32Array(positionAttribute.array.length);
      for (let i = 0; i < positionAttribute.array.length; i += 3) {
        const randomColor =
          normalizedColorList[Math.floor(Math.random() * normalizedColorList.length)];
        val[i] = randomColor[0]; //size
        val[i + 1] = randomColor[1]; // clr1
        val[i + 2] = randomColor[2]; // clr2
      }
    }
    return val;
  }

  initScene() {


    const group = new THREE.Group();
    const points = new THREE.Points();
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(this.particlesPosition, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(this.propsSizeAttribute, 3));
    geometry.setAttribute('clrpoint', new THREE.BufferAttribute(this.propsColorAttribute, 3));

    const shaderMaterial = new THREE.ShaderMaterial({
      fragmentShader: fragmentInstanceBuddle,
      vertexShader: vertexInstanceBuddle,
      uniforms: this.uniforms,
      transparent: true,
      blending: THREE.CustomBlending,
      blendSrc: THREE.SrcAlphaFactor,
      blendDst: THREE.OneFactor,
      blendSrcAlpha: 1,
    });

    points.material = shaderMaterial;
    group.add(points);
    this.scene.add(group);

  }
  
  render() {
    this.renderer.render(this.scene, this.camera);
  }

}
