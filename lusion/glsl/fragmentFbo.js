export const fragmentFbo = `
    uniform sampler2D tDiffuse;
    uniform sampler2D tPrev;
    uniform vec2 u_vel;
    uniform vec2 resolution;
    varying vec2 vUv;

    uniform vec3 u_dissipations;
    uniform float u_curlScale;
    uniform float u_pushStrength;
    uniform float u_curlStrength;
    uniform vec2 u_paintTexelSize;

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


        vec2 px = vec2(1.,resolution.y/resolution.x);

        vec4 color = texture2D(tDiffuse,vUv);
        vec4 prev = texture2D(tPrev,vUv);



    vec2 res = sdSegment(gl_FragCoord.xy,u_drawFrom.xy, u_drawTo.xy);
     vec2 radiusWeight = mix(u_drawFrom.zw, u_drawTo.zw, res.y);
    float d = 1.0-smoothstep(-0.01, radiusWeight.x, res.x);
    vec4 lowData = texture2D(tDiffuse, vUv);
    vec2 velInv = (0.5-lowData.xy)*u_pushStrength;
    vec3 noise3 = noised(gl_FragCoord.xy*u_curlScale*(1.0-lowData.xy));
    vec2 noise = noised(gl_FragCoord.xy*u_curlScale*(2.0-lowData.xy*(0.5+noise3.x)+noise3.yz*0.1)).yz;
    velInv += noise*(lowData.z+lowData.w)*u_curlStrength;



    vec4 data = texture2D( tPrev, vUv+velInv*u_paintTexelSize);

     data.xy -= 0.5;
        
    vec4 delta = (u_dissipations.xxyz-1.0)*data;
    vec2 newVel = u_vel*d;
    delta += vec4(newVel, radiusWeight.yy*d);
    delta.zw = sign(delta.zw)*max(vec2(0.004), abs(delta.zw));
    
    data += delta;
  
    data.xy += 0.5;
    gl_FragColor = clamp(data, vec4(0.3), vec4(1.0));

   vec4 view = data;
    
    //  gl_FragColor = color + (w2 + w1 + w3 + w4)*.1 ;
    // gl_FragColor = vec4(vec3(1.,.3,.1) * data.xyz,1.);
   // gl_FragColor = vec4(res.x,0.,0.,0.);
//  gl_FragColor = color  + prev * 0.6;
gl_FragColor = vec4(view.xyz,1.);
//   gl_FragColor = vec4(res,0.,1.);
    }
`