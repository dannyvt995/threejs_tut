import Common from "./Common.js";
import * as THREE from "three";

import Simulation from "./Simulation.js";
import {faceVert} from "./glsl/sim/faceVert.js";
import {colorFrag} from "./glsl/sim/colorFrag.js";


export default class Output{
    constructor(props){
        this.props = props;
        this.outMat = null
        this.init();
    }

    init(){
    

        this.scene = new THREE.Scene();
        this.scene.background = 0x000000
        const light = new THREE.AmbientLight( 0x404040 ); // soft white light
        this.scene.add( light );
        const directionalLight = new THREE.DirectionalLight( 0xffffff, 2.5 );
        this.scene.add( directionalLight );

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 3
        this.textureImg = new THREE.TextureLoader().load('textures/cat.jpg' ); 
       
        this.simulation = new Simulation(this.scene);
        this.outMat =    new THREE.ShaderMaterial({
            vertexShader: `
             
                uniform vec2 px;
                uniform vec2 boundarySpace;
                varying vec2 vUv;

                precision highp float;

                void main(){
                    vec3 pos = position;
                    vec2 scale = 1.0 - boundarySpace * 2.0;
                    pos.xy = pos.xy * scale;
                    vUv = vec2(0.5)+(pos.xy)*0.5;
           
                    gl_Position =vec4(position , 1.0);
                }
                 
               
            `,
            fragmentShader: colorFrag,
            uniforms: {
                time:{
                    value: 0
                },
                velocity: {
                    value: this.simulation.fbos.vel_0.texture
                },
                div: {
                    value: this.simulation.fbos.div.texture
                },
                pressure: {
                    value: this.simulation.fbos.pressure_1.texture
                },
                textureImg : {
                    value : this.textureImg
                },
                boundarySpace: {
                    value: new THREE.Vector2()
                }
            },
            wireframe:false,
            transparent:true,
            blending: THREE.AdditiveBlending
        })
        this.output = new THREE.Mesh(
            new THREE.PlaneGeometry(2,2),
            this.outMat
        );
       this.obj = new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1),
            new THREE.MeshPhongMaterial({color:'blue',shininess:100})
       )
       this.obj.position.z = 0 
       this.output.position.z = 0
      this.scene.add(this.output, this.obj );
    }
    addScene(mesh){
        this.scene.add(mesh);
    }

    resize(){
        this.simulation.resize();
    }

    render(){
        Common.renderer.setRenderTarget(null);
        Common.renderer.render(this.scene, this.camera);
    }

    update(){
       // this.obj.rotateX(Common.delta)
        this.obj.rotateY(Common.delta)
        this.outMat.uniforms.time.value = Common.time
        this.simulation.update();
        this.render();
    }
}