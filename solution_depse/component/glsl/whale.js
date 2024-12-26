import { curlGlsl, easeGlsl, rotationGlsl } from "./common.js";
export const fragmentInstanceBuddle = `
varying float vDistance;
varying vec3 pOs;
varying vec2 vUv;
varying vec3 sizedf;
varying vec3 posorgin;
varying vec3 pointcolor;


void main() {
  vec4 aqua = vec4(0.3, 0.6, 0.8, 1.0);
  vec4 blue = vec4(0.4, 0.6, 1.0, 1.0);
  vec4 deepPurple = vec4(0.1, 0.2, 0.5, 1.0);
  vec3 color = vec3(1.);
  float str = distance(gl_PointCoord, vec2(0.5));
  str = pow(1.0 - str, 3.0);
  color = mix(vec3(0.0), color, str);
  float c = distance(gl_PointCoord, vec2(0.5));
  float clr1 = smoothstep(.1,.105,c) ;
  float randSize = sizedf.z;
  randSize  = clamp(0.024,.9,sizedf.x);
  vec3 clrmix = mix(blue.xyz,deepPurple.xyz,randSize);
  vec3 clrmix2 = mix(clrmix,vec3(1.),sizedf.y);

  gl_FragColor = vec4(  ( vec3(1.-clr1 ) * pointcolor )   , 1. - min(0.09, pointcolor.x/3.));
}
`;
export const vertexInstanceBuddle = `
varying vec2 vUv;
varying vec3 pOs;
uniform float uTime;
uniform float uProgress;
uniform float diffScroll;
uniform vec2 resolution;
varying float vDistance;
uniform vec2 uMouse;
attribute vec3 size;
attribute vec3 clrpoint;
varying vec3 pointcolor;

varying vec3 sizedf;
varying vec3 posorgin;

${rotationGlsl}
${easeGlsl}

${curlGlsl}

void main() {
  vec3 transformed = position;

  float frequency = .2;
  float amplitude = 0.042;
  float maxDistance = 1.;

  // sim rot
  float angle = uMouse.x/5.;  
  mat3 rotationMatrix = mat3(
      cos(angle), 0.0, sin(angle),
      0.0, 1.0, 0.0,
      -sin(angle), 0.0, cos(angle)
  );
  //float lock = 1. + max(0.,clamp(uProgress,0.,10.));
  float progress_xx = 1.5;
  float progress_rot = 0.3;


  transformed.y += quadraticIn(uProgress) * (resolution.y * 2.6);
  transformed = rotate(transformed,vec3(0.,-.1,0.),max(0.,uProgress )/2.);

  float mixAm =  min(0.03, diffScroll * 10. );//not

  


  transformed = position;


  transformed += vec3(  (quadraticOut(uProgress) * (resolution.x / 22.) * 1.)  ,uProgress * (resolution.y/5.2),quadraticOut(uProgress) * 1.2);
  vec3 tar1 = transformed + curl( transformed.x * frequency, transformed.y * frequency, transformed.z * frequency ,0. ) * .05 ;
  transformed = mix( transformed, tar1, pow( length( transformed - tar1 ) / maxDistance, .5 ) );

  mixAm = amplitude ;
  vec3 tar = transformed + curl( transformed.x * frequency, transformed.y * frequency, transformed.z * frequency ,0. ) * mixAm ;
  float d = length( transformed - tar ) / maxDistance;
  vec3 noisePos = mix( transformed, tar, pow( d, .5 ) );
  transformed = noisePos;

  vec4 projectedPosition = projectionMatrix  *  viewMatrix * modelMatrix * vec4(transformed, 1.);
  gl_Position = projectedPosition;

  gl_PointSize = 80.* size.z ;

  vUv = uv;
  posorgin = position;
  pOs = transformed;
  sizedf = size;
  pointcolor = clrpoint;
}
`;