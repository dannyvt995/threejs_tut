export const  advectionFrag = `
precision highp float;
uniform sampler2D velocity;
uniform float dt;
uniform bool isBFECC;
// uniform float uvScale;
uniform vec2 fboSize;
uniform vec2 px;
varying vec2 uv;
float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

void main(){
    vec2 ratio = max(fboSize.x, fboSize.y) / fboSize;

    vec2 vel = texture2D(velocity, uv).xy;
    float rand = random(uv) * 0.01;
    float dtc = dt * 12.;
        vec2 uv2 = uv - vel * dt * ratio ;
        vec2 newVel = texture2D(velocity, uv2).xy;
        gl_FragColor = vec4(newVel, 0.0, 0.0) ;
}


`