

export  const   externalForceFrag = `
precision highp float;
uniform float time;
uniform vec2 force;
uniform vec2 center;
uniform vec2 scale;
uniform vec2 px;
uniform vec2 dir;
varying vec2 vUv;
float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}
        

        float sdSphere( vec3 p, float s )
            {
            return length(p)-s;
            }

void main(){

        float cc = sdSphere(vec3(vUv - .5,0.),.3);
      vec2 circle = (vec2(vUv.x,vUv.y) - 0.5) * 1.0 ;
      vec2 dd = force - center;
    float d = 1.0-min(length(circle) , 1.0);
    //d *= d * d *d * d *d * d* random(vec2(vUv.x,d));
    d *= d * d;
    vec2 f = vec2(.1,.1);
    gl_FragColor = vec4(dir * d  , 0, 1);

//         gl_FragColor = vec4(vec2(cc) * dd, 0, 1.-cc);


//         vec2 otot = cc * dd;
// gl_FragColor = vec4(otot.x,0,0, 1.);
}

`