import {faceVert} from "./glsl/sim/faceVert.js";
import {clearColorFrag} from "./glsl/sim/clearColorFrag.js";
import Renderer from "./Renderer.js";
import ShaderPass from "./ShaderPass.js";

export default class ClearColor extends ShaderPass{
    constructor(simProps){
        super({
            material: {
                vertexShader: faceVert,
                fragmentShader: clearColorFrag,
                uniforms: {
                    boundarySpace: {
                        value: simProps.boundarySpace
                    },
                    pressure: {
                        value: simProps.dst_.texture
                    },
                    px: {
                        value: simProps.cellScale
                    },
                    time:{value:0}
                },
            },
            output: simProps.dst,

            output0: simProps.dst_,
            output1: simProps.dst
        });

        this.init();
    }

    update({iterations}){
        let p_in, p_out;

        for(var i = 0; i < iterations; i++) {
            if(i % 2 == 0){
                p_in = this.props.output0;
                p_out = this.props.output1;
            } else {
                p_in = this.props.output1;
                p_out = this.props.output0;
            }
            this.uniforms.time.value = Renderer.deltaTime
            this.uniforms.pressure.value = p_in.texture;
            this.props.output = p_out;
            super.update();
        }

        return p_out;
    }
}