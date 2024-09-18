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
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 4
       
        this.simulation = new Simulation(this.scene);
        this.outMat =    new THREE.RawShaderMaterial({
            vertexShader: faceVert,
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
                boundarySpace: {
                    value: new THREE.Vector2()
                }
            },
        })
        this.output = new THREE.Mesh(
            new THREE.PlaneGeometry(2, 2),
            this.outMat
        );

      this.scene.add(this.output);
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
     
        this.outMat.uniforms.time.value = Common.time
        this.simulation.update();
        this.render();
    }
}