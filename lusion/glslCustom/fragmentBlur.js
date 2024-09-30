export const fragmentBlur = `
    uniform sampler2D u_texture;
uniform vec2 dt;
uniform vec2 resolution;
varying vec2 vUv;
void main() {
    vec4 colorOri = texture2D(u_texture, vUv);
   
    gl_FragColor = colorOri;
}

`