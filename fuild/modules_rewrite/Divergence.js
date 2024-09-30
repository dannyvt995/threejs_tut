import {faceVert} from "./glsl/sim/faceVert.js";
import {divergenceFrag} from "./glsl/sim/divergenceFrag.js";

import ShaderPass from "./ShaderPass.js";

export default class Divergence extends ShaderPass{
    constructor(simProps){
        super({
            
            material: {
                name:"DivergencePass",
                vertexShader: faceVert,
                fragmentShader: divergenceFrag,
                uniforms: {
                    boundarySpace: {
                        value: simProps.boundarySpace
                    },
                    velocity: {
                        value: simProps.src.texture
                    },
                    px: {
                        value: simProps.cellScale
                    },
                    dt: {
                        value: simProps.dt
                    }
                }
            },
            output: simProps.dst
        })

        this.init();
    }

    update({ vel }){
        this.uniforms.velocity.value = vel.texture;
        super.update();
    }
}