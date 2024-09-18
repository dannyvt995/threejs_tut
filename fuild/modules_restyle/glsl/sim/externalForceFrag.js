

export  const   externalForceFrag = `
precision highp float;
uniform float time;
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

void main(){


      vec2 circle = (vUv - 0.5) * 2.0 ;
      vec2 dd = force - center;
    float d = 1.0-min(length(circle) , 1.0);
    d *= d * d;
    gl_FragColor = vec4(force * d, 0, 1);
}

`