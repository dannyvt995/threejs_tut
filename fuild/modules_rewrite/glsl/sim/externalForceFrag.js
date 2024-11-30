

export  const   externalForceFrag = `
precision highp float;

uniform vec2 force;
uniform vec2 center;
uniform vec2 scale;
uniform vec2 px;
varying vec2 vUv;
float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}


uniform vec2 resolution;              
uniform vec4 u_drawTo;
uniform vec4 u_drawFrom;

vec2 sdSegment(in vec2 p, in vec2 a, in vec2 b) {
        vec2 pa = p-a, ba = b-a;
        float h = clamp(dot(pa, ba)/dot(ba, ba), 0.0, 1.0);
        return vec2(length(pa-ba*h), h);
}


void main(){



    vec2 px = vec2(1.,resolution.y/resolution.x);

    vec2 res = sdSegment(gl_FragCoord.xy, u_drawFrom.xy, u_drawTo.xy);
    vec2 radiusWeight = mix(u_drawFrom.zw, u_drawTo.zw, res.y);
    float d22 = smoothstep(-0.01, radiusWeight.x, res.x);




      vec2 circle = ( vec2(vUv.x,vUv.y)  * vec2(1.,1.)   - 0.5) * 2.0 ;
        vec2 circle22 = (vUv  - 0.5) * 100. ;
         float d2 = 1.0-min(length(circle22) , 1.);

    float d = 1.0-min(length(circle) , 1.0);
  //  d *= d;
    d *= d * d * d * d * d ;

    float dir = -1. ;
   //dir = 1.;

  vec2 something = vec2(min(0.01,force.x),min(0.01,force.y));
  vec2 something22 = sign(force) * vec2(.05);
    gl_FragColor = vec4( dir *  force   * d  + something22  * 0., 0,  1.);
  
  
 //  gl_FragColor = vec4(dir  * vec2(d22 * 0.001) ,0,  1.);

}

`