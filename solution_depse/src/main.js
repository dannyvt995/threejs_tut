import * as THREE from 'three';
import Stats from 'three/addons/stats.module.js';
import { OrbitControls } from 'three/addons/OrbitControls.js';
import SplineLoader from '@splinetool/loader';




let renderer,scene,controls

// camera
let camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2,  -100000, 100000);
//camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, -100000, 100000 );
camera.position.set(51.26, 174.3, 15000);

camera.quaternion.setFromEuler(new THREE.Euler(0, 0, 0));

// scene
scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper( window.innerHeight );
scene.add( axesHelper );
// spline scene
const loader = new SplineLoader();
loader.load(
  'https://prod.spline.design/34pyEDwxIhuksuhA/scene.splinecode',
  (splineScene) => {
    let getObj = {
      rock1:null,
      rock2:null,
      rock3:null,
      camera:null,
      camera2:null,
      dirLight:null,
      amLight:null
    }

    for (let i = 0; i < splineScene.children[0].children.length; i++) {
     
      let t = splineScene.children[0].children[i].name
      let a = splineScene.children[0].children[i]
      if(t === 'Rock 1') getObj.rock1 = a
      if(t === 'Rock 2') getObj.rock2 = a
      if(t === 'Rock 3') getObj.rock3 = a
      if(t === 'Camera') getObj.camera = a
      if(t === '1') getObj.camera2 = a
      if(t === 'Directional Light') {
        getObj.dirLight = a
        scene.add( getObj.dirLight );
        const helper = new THREE.DirectionalLightHelper( getObj.dirLight, 5 );
        scene.add( helper );
      }
      if(t === 'Default Ambient Light') {
        getObj.amLight = a
        scene.add( getObj.amLight );
        const helper = new THREE.HemisphereLightHelper( getObj.amLight, 5 );
        scene.add( helper );
      }
    }
    console.log(getObj)

    let listrock  = [getObj.rock1,getObj.rock2,getObj.rock3]

 
    const grRock = new THREE.Group()
    for (let i = 0; i < listrock.length; i++) {
      let me = listrock[i]
      const geometry2 = new THREE.BufferGeometry();
      geometry2.setAttribute('position', new THREE.BufferAttribute(me.data.geometry.data.attributes.position.array, 3));
      geometry2.setAttribute('normal', new THREE.BufferAttribute(me.data.geometry.data.attributes.normal.array, 3));
      geometry2.setAttribute('uv', new THREE.BufferAttribute(me.data.geometry.data.attributes.uv.array, 2));
      geometry2.setIndex(new THREE.BufferAttribute(me.data.geometry.data.index.array, 1));
      geometry2.computeVertexNormals(); 
      console.log(me)
      let material2 =  me.material[0]
      material2.flatShading = false
      //flatsuck when use geometry2
      //problem on me.geometryCreateDeleyed
      const mesh2 = new THREE.Mesh(me.geometryCreateDeleyed, material2);
  
      mesh2.position.copy(me.position)
      mesh2.scale.copy(me.scale)
      mesh2.rotation.copy(me.rotation)
      mesh2.quaternion.copy(me.quaternion)
    console.log(mesh2)
      mesh2.receiveShadow = true
      mesh2.castShadowShadow = true
      grRock.add(mesh2)
    
    }
    grRock.rotation.x = 1.5
   scene.add(grRock);


    let aaa = splineScene.children[0].children[2]
    // aaa.material[0].wireframe = true
   
  //  scene.add(splineScene);

    //note///
    //normalMatrix

    initMain()
  }
);

initRenderer()
  function initRenderer(){
    // renderer
  renderer = new THREE.WebGLRenderer({ antialias: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  document.body.appendChild(renderer.domElement);

  // scene settings
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  scene.background = new THREE.Color('#0c0f16');
  renderer.setClearAlpha(0);
}
function initMain() {
  // orbit controls
  controls = new OrbitControls(camera, renderer.domElement);

  controls.enableDamping = true;
  controls.dampingFactor = 0.125;

}


window.addEventListener('resize', onWindowResize);
function onWindowResize() {
  camera.left = window.innerWidth / - 2;
  camera.right = window.innerWidth / 2;
  camera.top = window.innerHeight / 2;
  camera.bottom = window.innerHeight / - 2;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(time) {
  controls?.update();
  renderer.render(scene, camera);
}
