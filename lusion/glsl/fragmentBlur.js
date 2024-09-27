export const fragmentBlur = `
    uniform sampler2D u_texture;
uniform vec2 dt;
uniform vec2 resolution;
varying vec2 vUv;
void main() {
    vec4 color = texture2D(u_texture, vUv)*0.1633;
     vec4 colorOri = texture2D(u_texture, vUv);
    vec2 delta = dt;
    color += texture2D(u_texture, vUv-delta)*0.1531;
    color += texture2D(u_texture, vUv+delta)*0.1531;
    delta += dt;
    color += texture2D(u_texture, vUv-delta)*0.12245;
    color += texture2D(u_texture, vUv+delta)*0.12245;
    delta += dt;
    color += texture2D(u_texture, vUv-delta)*0.0918;
    color += texture2D(u_texture, vUv+delta)*0.0918;
    delta += dt;
    color += texture2D(u_texture, vUv-delta)*0.051;
    color += texture2D(u_texture, vUv+delta)*0.051;


    vec2 pixel =   gl_FragCoord.xy / resolution.xy;
           float xPixel = 1.0/resolution.x;//The size of a single pixel
	        float yPixel = 1.0/resolution.y;

    vec4 rightColor = texture2D(u_texture,vec2(pixel.x+xPixel,pixel.y));
	vec4 leftColor = texture2D(u_texture,vec2(pixel.x-xPixel,pixel.y));
	vec4 upColor = texture2D(u_texture,vec2(pixel.x,pixel.y+yPixel));
	vec4 downColor = texture2D(u_texture,vec2(pixel.x,pixel.y-yPixel));


  
//    gl_FragColor = vec4(vec3(x1),1.);
     float factor = 8.0 * 0.016 * (leftColor.r + rightColor.r + downColor.r * 3.0 + upColor.r);
    gl_FragColor = upColor;
    gl_FragColor = vec4(vec3(factor),1.);
     gl_FragColor = colorOri ;
  gl_FragColor = vec4(1.-vec3(color.xyz),1.);
  gl_FragColor = colorOri;
}

`