

export  const   poissonFrag = `
precision highp float;
uniform sampler2D pressure;
uniform sampler2D divergence;
uniform vec2 px;
varying vec2 uv;

void main(){    
    float step = 2.;
    // poisson equation
    float p0 = texture2D(pressure, uv+vec2(px.x * step,  0)).r;
    float p1 = texture2D(pressure, uv-vec2(px.x * step, 0)).r;
    float p2 = texture2D(pressure, uv+vec2(0, px.y * step )).r;
    float p3 = texture2D(pressure, uv-vec2(0, px.y * step )).r;
    float div = texture2D(divergence, uv).r;
    
    float newP = (p0 + p1 + p2 + p3)  * .15 - div * 1. ;

    gl_FragColor = vec4(newP);

}


`