import {faceVert} from "./glsl/sim/faceVert.js";
import {lineVert} from "./glsl/sim/lineVert.js";

import {advectionFrag} from "./glsl/sim/advectionFrag.js";
import ShaderPass from "./ShaderPass.js";

import * as THREE from "three";


export default class Advection extends ShaderPass{
    constructor(simProps){
        super({
            material: {
                vertexShader: faceVert,
                fragmentShader: advectionFrag,
                uniforms: {
                    boundarySpace: {
                        value: simProps.cellScale
                    },
                    px: {
                        value: simProps.cellScale
                    },
                    fboSize: {
                        value: simProps.fboSize
                    },
                    velocity: {
                        value: simProps.src.texture
                    },
                    dt: {
                        value: simProps.dt
                    },
                    isBFECC: {
                        value: true
                    }
                },
            },
            output: simProps.dst
        });

        this.init();
    }

    init(){
        super.init();
        this.createBoundary();
    }

    createBoundary(){
        
        this.material = new THREE.RawShaderMaterial({
            vertexShader: lineVert,
            fragmentShader: advectionFrag,
            uniforms: this.uniforms
        });

       
        this.geometry = new THREE.PlaneGeometry(2.0, 2.0);
        this.plane = new THREE.Mesh(this.geometry,  this.material );
        this.scene.add(this.plane);
    }

    update({ dt, isBounce, BFECC }){

        this.uniforms.dt.value = dt;
        this.uniforms.isBFECC.value = BFECC;

        super.update();
    }
}