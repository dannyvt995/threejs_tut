
export  const   pressureFrag = `
precision highp float;
uniform sampler2D pressure;
uniform sampler2D velocity;
uniform vec2 px;
uniform float dt;
varying vec2 uv;

void main(){
    float step = 1.;

    float p0 = texture2D(pressure, uv+vec2(px.x * step, 0)).r;
    float p1 = texture2D(pressure, uv-vec2(px.x * step, 0)).r;
    float p2 = texture2D(pressure, uv+vec2(0, px.y * step)).r;
    float p3 = texture2D(pressure, uv-vec2(0, px.y * step)).r;

    float dtt = dt;
    dtt *= 1.;
    vec2 v2 = texture2D(velocity, uv).xy;
    vec2 gradP2 = vec2(p0 - p1, p2 - p3) * .5;
    v2 =  v2 - gradP2 * dtt;

    float SOLUTION_TO_FADE = 1.02; /// FROM 1.01 - 1.02

    vec4 rls = vec4(v2 / SOLUTION_TO_FADE, 0.0, 1.0);
    float decay = 1.0 + .01 * dt;
    gl_FragColor = rls  ;
  
}

`