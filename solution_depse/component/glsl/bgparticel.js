import { curlGlsl } from "./common.js";
export const fragmentInstanceBuddle = `
varying vec3 pOs;
varying vec2 vUv;
varying float sizedf;
varying vec3 randomAtt;
uniform vec2 uResolution;

vec4 pointRand(vec2 st,float random, vec3 color,int type,vec3 randomAttIn) {
    // CHANGE TIMELINE BASE TIME , RECOM ONLY 1
    float cir = distance(st, vec2(0.5));
    if(type == 0) {

    float randClamp = mix(0.,0.2,random);
    float randAlpha = mix(0.5,1.,random);
    cir = smoothstep(0.0 ,randClamp,cir);
    vec4 rls = vec4(vec3(1.-cir),1.) * vec4(0.4, 0.6, 1.0,1.);
    return rls;
}else if(type == 1) {

float alpha = random;
float randClamp = mix(0.,0.5,random);
    float randAlpha = mix(0.5,1.,random);
    cir = smoothstep(0.0 ,randClamp,cir);
    vec4 rls = vec4(vec3(1.-cir),1.) ;
    return rls;

}else if(type == 2) {
    float randClamp = mix(0.,0.5,random);
    float randAlpha = mix(0.5,1.,random);
    cir = smoothstep(0.0 ,randClamp,cir);
    vec4 rls = vec4(vec3(1.-cir),1.) * vec4(0.3, 0.6, 0.8,1.);
    return rls;
}else if(type == 3) {
    float randClamp = mix(0.,0.5,random);
    float randAlpha = mix(0.5,1.,random);
    cir = smoothstep(0.0 ,randClamp,cir);
    vec4 rls = vec4(vec3(1.-cir),1.) * vec4(0.4, 0.6, 1.0,1.);
    return rls;
}else if(type == 4) {
    float randClamp = mix(0.,0.9,random);
    float randAlpha = mix(0.1,.5,random);
    cir = smoothstep(0.0 ,randClamp,cir);
    vec4 rls = vec4(vec3(1.-cir),1.) * vec4(0.1, 0.2, 0.5,1.);
    return rls;
}
}
    
    


void main() {
    
    //PALLET CLR
    vec3 aqua = vec3(0.3, 0.6, 0.8);
    vec3 blue = vec3(0.4, 0.6, 1.0);
    vec3 deepPurple = vec3(0.1, 0.2, 0.5);

    // RAND LAYER 
    // convert float to int
    highp int ID = int(randomAtt.y);

    vec4 rlsOut = pointRand(gl_PointCoord,randomAtt.x,deepPurple,ID,randomAtt);
    
    
    //OUT
    vec4 outRls = vec4(1.);
    outRls *= rlsOut;
    gl_FragColor = outRls;
//gl_FragColor = vec4(aqua,1.);
}
`;
export const vertexInstanceBuddle = `
varying vec2 vUv;
varying vec3 pOs;
uniform float uTime;
uniform float uScroll;
uniform float uDiffScroll;
attribute float size;
attribute vec3 propsmutil;
varying float sizedf;
varying vec3 randomAtt;
uniform vec2 uMouse;
uniform vec2 propsDomMap;
uniform vec2 uResolution;
uniform sampler2D uPositionTexture;
uniform sampler2D uVelocityTexture;


${curlGlsl}

void main() {
float totalHeightDom = propsDomMap.x;
float countDom = propsDomMap.y;
vec3 pos = position;
vec3 transformed = pos;
float maxDistance = 1.;
float  frequency = 1.;
float amplitude = 500.72;


vec3 tar = transformed + curl( transformed.x * frequency, transformed.y * frequency, transformed.z * frequency ,uMouse) * amplitude;
vec3 nois = tar;
//test perinodddd

nois.y += uScroll * 6.;
nois.y -= uDiffScroll/50.;
transformed = vec3(nois.xy,position.z);




vec4 projectedPosition = projectionMatrix  *  viewMatrix * modelMatrix * vec4(transformed, 1.);
gl_Position = projectedPosition;

gl_PointSize =  10.;

vUv = uv;
pOs = transformed;
sizedf = size;
randomAtt=propsmutil;
}
`;
