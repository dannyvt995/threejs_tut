

export  const   divergenceFrag = `
precision highp float;
uniform sampler2D velocity;
uniform float dt;
uniform vec2 px;
varying vec2 uv;


void main(){
  float step = 1.;

    float x0 = texture2D(velocity, uv-vec2(px.x * step, 0)).x;
    float x1 = texture2D(velocity, uv+vec2(px.x * step, 0)).x;
    float y0 = texture2D(velocity, uv-vec2(0, px.y * step)).y;
    float y1 = texture2D(velocity, uv+vec2(0, px.y * step)).y;
    float divergence = (x1-x0 + y1-y0) / 1.;
    divergence *= 1.0;
    float speedDiss = 1.;
    gl_FragColor = vec4(divergence / (dt*speedDiss)) ;
}

`