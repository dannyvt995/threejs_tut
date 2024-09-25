export const fragmentFbo = `
    uniform sampler2D tDiffuse;
    uniform sampler2D tPrev;
    uniform vec2 resolution;
    varying vec2 vUv;
    #define NUM_OCTAVES 5
    float rand(vec2 n) { 
        return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
    }

    float noise(vec2 p){
        vec2 ip = floor(p);
        vec2 u = fract(p);
        u = u*u*(3.0-2.0*u);
        
        float res = mix(
            mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
            mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
        return res*res;
    }

    float fbm(vec2 x) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100);
        // Rotate to reduce axial bias
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
        for (int i = 0; i < NUM_OCTAVES; ++i) {
            v += a * noise(x);
            x = rot * x * 2.0 + shift;
            a *= 0.5;
        }
        return v;
    }

    void main() {
        vec4 color = texture2D(tDiffuse,vUv);
        vec4 prev = texture2D(tPrev,vUv);

        vec2 as = vec2(1.,resolution.y/resolution.x);
        vec2 noi = fbm(vUv * 22.) * as * 0.005;


        vec4 texel = texture2D(tPrev, vec2(vUv.x,vUv.y));
        vec4 texel1 = texture2D(tPrev, vec2(vUv.x + noi.x,vUv.y));
        vec4 texel2 = texture2D(tPrev, vec2(vUv.x - noi.x,vUv.y));
        vec4 texel3 = texture2D(tPrev, vec2(vUv.x,vUv.y + noi.y));
        vec4 texel4 = texture2D(tPrev, vec2(vUv.x,vUv.y - noi.y));

  

        
        gl_FragColor = color + prev * .9;
   
        gl_FragColor = texel3 ;
    
    }
`