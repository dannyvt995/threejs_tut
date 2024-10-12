export const fragmentFbo = `

    uniform sampler2D tDiffuse;
    uniform sampler2D tPrev;
    uniform vec2 resolution;
    varying vec2 vUv;
    void main() {


        vec2 px = vec2(1.,resolution.y/resolution.x);

        vec4 color = texture2D(tDiffuse,vUv);
        vec4 prev = texture2D(tPrev,vUv);

 
        gl_FragColor = color  * .1+ prev * 0.9;
    }
`