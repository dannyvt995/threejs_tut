


export  const   colorFrag = `
precision highp float;

uniform float time;
uniform sampler2D velocity;
uniform sampler2D div;
uniform sampler2D pressure;
uniform sampler2D textureImg;
varying vec2 vUv;

vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}

void main(){
    vec2 vel = texture2D(velocity, vUv).xy;
     vec2 pre = texture2D(pressure, vUv).xy;
     vec3 image = texture2D(textureImg, (vel + vec2(.5))).xyz;

    float len = length(vel);
    vel = vel * 0.5 + 0.5;
    
  


    vec3  col = pal( pre.y , vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.33,0.67) );

    vec3  colBase = pal(atan(vUv.y,vUv.x) , vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,0.5),vec3(0.8,0.90,0.30) );
     vec3  colVel = pal( atan(vel.y,vel.x) , vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,0.5),vec3(0.8,0.90,0.30) );


       vec3 color = vec3(vel.x, vel.y, 1.0);
    color = mix(vec3(1.0), colVel + colBase, len);

    
   gl_FragColor = vec4(1.- color , 1.); // good
   // gl_FragColor = vec4(1.- vec3(color.x) , 1.); 
}
`