export const fragmentWrite = `
    uniform sampler2D tFuild;
    varying vec2 vUv;
    void main() {


      vec3 fuild = texture2D(tFuild,vUv).xyz;
      float vel = length(fuild.xy);
gl_FragColor = vec4(vec3(vel),1.);
    }
`