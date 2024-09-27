export const fragmentWrite = `
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
    uniform vec4 u_drawTo;
        uniform vec4 u_drawFrom;
    vec2 sdSegment(in vec2 p, in vec2 a, in vec2 b) {
    vec2 pa = p-a, ba = b-a;
    float h = clamp(dot(pa, ba)/dot(ba, ba), 0.0, 1.0);
    return vec2(length(pa-ba*h), h);
        }

        vec2 hash(vec2 p) {
            vec3 p3 = fract(vec3(p.xyx)*vec3(.1031, .1030, .0973));
            p3 += dot(p3, p3.yzx+33.33);
            return fract((p3.xx+p3.yz)*p3.zy)*2.0-1.0;
        }
        vec3 noised(in vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            vec2 u = f*f*f*(f*(f*6.0-15.0)+10.0);
            vec2 du = 30.0*f*f*(f*(f-2.0)+1.0);
            vec2 ga = hash(i+vec2(0.0, 0.0));
            vec2 gb = hash(i+vec2(1.0, 0.0));
            vec2 gc = hash(i+vec2(0.0, 1.0));
            vec2 gd = hash(i+vec2(1.0, 1.0));
            float va = dot(ga, f-vec2(0.0, 0.0));
            float vb = dot(gb, f-vec2(1.0, 0.0));
            float vc = dot(gc, f-vec2(0.0, 1.0));
            float vd = dot(gd, f-vec2(1.0, 1.0));
            return vec3(va+u.x*(vb-va)+u.y*(vc-va)+u.x*u.y*(va-vb-vc+vd), ga+u.x*(gb-ga)+u.y*(gc-ga)+u.x*u.y*(ga-gb-gc+gd)+du*(u.yx*(va-vb-vc+vd)+vec2(vb, vc)-va));
        }

    void main() {
       

    vec2 res = sdSegment(gl_FragCoord.xy,u_drawFrom.xy, u_drawTo.xy);
      vec2 radiusWeight = mix(u_drawFrom.xy, u_drawTo.xy, res.y);
    gl_FragColor = vec4(1.-res.x,0.,0.,1.);
    gl_FragColor = vec4(vec3(0.),1.);
    }
`