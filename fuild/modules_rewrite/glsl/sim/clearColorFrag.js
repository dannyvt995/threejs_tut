export const clearColorFrag = `
precision highp float;
uniform sampler2D velocity;
uniform float fadeRate;
varying vec2 uv;

void main() {    
    vec4 color = texture2D(velocity, uv);
    color.rgb *= (1.0 - fadeRate);
    gl_FragColor = color;
}
`;