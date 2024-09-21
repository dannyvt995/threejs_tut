

export  const   divergenceFrag = `
precision highp float;
uniform sampler2D velocity;
uniform float dt;
uniform vec2 px;
varying vec2 uv;


vec2 sampleVelocity(in vec2 uv) {
    vec2 mult = vec2(1.0, 1.0);
    if (uv.x < 0.0 || uv.x > 1.0) { mult.x = -1.0; }
    if (uv.y < 0.0 || uv.y > 1.0) { mult.y = -1.0; }
    return texture2D(textureVel, uv).xy;
}
    
void main(){
    // float x0 = texture2D(velocity, uv-vec2(px.x , 0)).x;
    // float x1 = texture2D(velocity, uv+vec2(px.x, 0)).x;
    // float y0 = texture2D(velocity, uv-vec2(0, px.y)).y;
    // float y1 = texture2D(velocity, uv+vec2(0, px.y)).y;

    float x0 = sampleVelocity(uv-vec2(px.x , 0)).x;
    float x1 = sampleVelocity(uv+vec2(px.x, 0)).x;
    float y0 = sampleVelocity(uv-vec2(0, px.y)).y;
    float y1 = sampleVelocity(uv+vec2(0, px.y)).y;


    float divergence = (x1-x0 + y1-y0) / 2.0;
    
    gl_FragColor = vec4(divergence / dt);
}

`