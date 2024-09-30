import * as THREE from 'three';
import ShaderPass from './ShaderPass.js';
import { clearColorFrag } from './glsl/sim/clearColorFrag.js';
import { faceVert } from './glsl/sim/faceVert.js';

export default class ClearColor extends ShaderPass {
    constructor(simProps) {
        super({
            name:"ClearColorPass",
            material: {
                uniforms: {
                    velocity: { value: null },
                    fadeRate: { value: 0.01 }
                },
                vertexShader: faceVert,
                fragmentShader: clearColorFrag,
            },
            output: simProps.dst,
        });
        this.init();
    }

    update(props = {}) {
        this.uniforms.velocity.value = props.velocity || this.uniforms.velocity.value;
        this.uniforms.fadeRate.value = props.fadeRate || this.uniforms.fadeRate.value;
        super.update();
    }
}