export const  advectionFrag = `
precision highp float;
uniform sampler2D velocity;
uniform float dt;
uniform bool isBFECC;
// uniform float uvScale;
uniform vec2 fboSize;
uniform vec2 px;
uniform vec2 force;
varying vec2 uv;
float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

void main(){
    vec2 ratio = max(fboSize.x, fboSize.y) / fboSize;
    float ran = random(ratio) * .09 * sign(force.x);
    vec2 vel = texture2D(velocity, uv + ran * 0.).xy;

        vec2 uv2 = uv  + vel * dt * ratio * 420. ;
    
        vec2 newVel = texture2D(velocity, uv2  ).xy;

           vec4 result = vec4(newVel, 0.0, 0.0);
            float decay = 1.0;
            // if(abs(force.x) > 0.) {
            //     decay += dt * .1;
            // }else{
            //      decay += dt * .9;
            // }
        gl_FragColor = result / decay;
}


`