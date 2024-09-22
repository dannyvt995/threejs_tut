

export  const   clearColorFrag = `
precision highp float;
uniform sampler2D pressure;
uniform sampler2D divergence;
uniform float delta;
uniform vec2 px;
varying vec2 uv;

void main(){    
    vec3 color = texture2D(pressure, uv).rgb;
        color = vec4(1.);
    gl_FragColor = vec4(color,1.);
}


`