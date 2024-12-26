
export const vertRock0 = `
precision mediump sampler2DArray;
precision highp float;
precision highp int;
//needed prepare
// uniform mat4 modelMatrix;
// uniform mat4 modelViewMatrix;
// uniform mat4 projectionMatrix;
// uniform mat4 viewMatrix;
// uniform mat3 normalMatrix;
// uniform vec3 cameraPosition;
// uniform bool isOrthographic;

uniform int frameIndex;
uniform vec2 resolution;
uniform mat4 previousModelViewMatrix;
uniform mat4 previousProjectionMatrix;

//attribute
// in vec3 position;
// in vec3 normal;
// in vec2 uv;
// in vec3 color;
vec3 spe_normalBlend( vec3 a, vec3 b, float alpha ) {
    return mix( a, b, alpha );
}
vec3 spe_multiplyBlend( vec3 a, vec3 b, float alpha ) {
    return mix( a, a * b, alpha );
}
vec3 spe_screenBlend( vec3 a, vec3 b, float alpha ) {
    vec3 tmp = 1.0 - ( 1.0 - a ) * ( 1.0 - b );
    return mix( a, tmp, alpha );
}
vec3 spe_overlayBlend( vec3 a, vec3 b, float alpha ) {
    vec3 tmp = mix( 1. - 2. * (1. - a) * (1. - b), 2. * a * b, step( a, vec3(.5) ) );
    return clamp( mix( a, tmp, alpha ), 0.0, 1.0 );
}
vec3 spe_blend( vec3 a, vec3 b, float alpha, int mode ) {
    if ( mode == 0 ) return spe_normalBlend( a, b, alpha );
    else if ( mode == 1 ) return spe_multiplyBlend( a, b, alpha );
    else if ( mode == 2 ) return spe_screenBlend( a, b, alpha );
    else if ( mode == 3 ) return spe_overlayBlend( a, b, alpha );
    return vec3( 1.0 );
}
vec3 packNormalToRGB( const in vec3 normal ) {
    return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
    return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;
const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
    vec4 r = vec4( fract( v * PackFactors ), v );
    r.yzw -= r.xyz * ShiftRight8;
    return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
    return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
    return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
    return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
    vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
    return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
    return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
    return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
    return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
    return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
    return ( near * far ) / ( ( far - near ) * invClipZ - far );
}
float pow2( const in float x ) {
    return x*x;
}
vec3 pow2( const in vec3 x ) {
    return x*x;
}
float pow3( const in float x ) {
    return x*x*x;
}
float pow4( const in float x ) {
    float x2 = x*x;
    return x2*x2;
}
float max3( const in vec3 v ) {
    return max( max( v.x, v.y ), v.z );
}
float average( const in vec3 v ) {
    return dot( v, vec3( 0.3333333 ) );
}
highp float rand( const in vec2 uv ) {
    const highp float a = 12.9898, b = 78.233, c = 43758.5453;
    highp float dt = dot( uv.xy, vec2( a, b ) ), sn = mod( dt, 3.141592653589793 );
    return fract( sin( sn ) * c );
}
float precisionSafeLength( vec3 v ) {
    return length( v );
}
struct IncidentLight {
    vec3 color;
    vec3 direction;
    bool visible;
};
struct ReflectedLight {
    vec3 directDiffuse;
    vec3 directSpecular;
    vec3 indirectDiffuse;
    vec3 indirectSpecular;
};
struct GeometricContext {
    vec3 position;
    vec3 normal;
    vec3 viewDir;
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
    return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
    return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
    mat3 tmp;
    tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
    tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
    tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
    return tmp;
}
float luminance( const in vec3 rgb ) {
    const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
    return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
    return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
    float u = atan( dir.z, dir.x ) * 0.15915494309189535 + 0.5;
    float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * 0.3183098861837907 + 0.5;
    return vec2( u, v );
}
float neighbor_offset = 0.0001;
//uniform old move
//this varying
// out vec4 vCurrentPosition;
// out vec4 vPreviousPosition;
// out vec3 vViewPosition;
// out vec3 vWPosition;
// out vec3 vNormal;
// out vec2 vUv;
// out vec3 vPosition;
// out vec3 vWNormal;
// out vec3 vWorldViewDir;

varying vec4 vCurrentPosition;
varying vec4 vPreviousPosition;
varying vec3 vViewPosition;
varying vec3 vWPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vWNormal;
varying vec3 vWorldViewDir;

void main() {
    vec3 objectNormal = vec3( normal );
    vec3 transformedNormal = objectNormal;
    transformedNormal = normalMatrix * transformedNormal;
    vec3 displaced_position = position;
    vec3 displaced_normal = objectNormal;
    vNormal = normalize( transformedNormal );
    vec3 transformed = vec3( position );
    transformed = displaced_position;
    transformedNormal = normalMatrix * displaced_normal;
    vNormal = transformedNormal;
    vec4 mvPosition = vec4( transformed, 1.0 );
    mvPosition = modelViewMatrix * mvPosition;
    gl_Position = projectionMatrix * mvPosition;
    vViewPosition = - mvPosition.xyz;
    vec4 worldPosition = vec4( transformed, 1.0 );
    worldPosition = modelMatrix * worldPosition;
    vWPosition = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;
    vUv = uv;
    vPosition = transformed;
    vWNormal = inverseTransformDirection( transformedNormal, viewMatrix ).xyz;
    vWorldViewDir = isPerspectiveMatrix( projectionMatrix ) ?  ( (modelMatrix * vec4(position, 1.0)).xyz - cameraPosition ) : vec3( -viewMatrix[0][2], -viewMatrix[1][2], -viewMatrix[2][2] );
}
`
export const vertRock1 = `
precision mediump sampler2DArray;
precision highp float;
precision highp int;
//needed prepare
// uniform mat4 modelMatrix;
// uniform mat4 modelViewMatrix;
// uniform mat4 projectionMatrix;
// uniform mat4 viewMatrix;
// uniform mat3 normalMatrix;
// uniform vec3 cameraPosition;
// uniform bool isOrthographic;

uniform int frameIndex;
uniform vec2 resolution;
uniform mat4 previousModelViewMatrix;
uniform mat4 previousProjectionMatrix;

//attribute
// in vec3 position;
// in vec3 normal;
// in vec2 uv;
// in vec3 color;
vec3 spe_normalBlend( vec3 a, vec3 b, float alpha ) {
    return mix( a, b, alpha );
}
vec3 spe_multiplyBlend( vec3 a, vec3 b, float alpha ) {
    return mix( a, a * b, alpha );
}
vec3 spe_screenBlend( vec3 a, vec3 b, float alpha ) {
    vec3 tmp = 1.0 - ( 1.0 - a ) * ( 1.0 - b );
    return mix( a, tmp, alpha );
}
vec3 spe_overlayBlend( vec3 a, vec3 b, float alpha ) {
    vec3 tmp = mix( 1. - 2. * (1. - a) * (1. - b), 2. * a * b, step( a, vec3(.5) ) );
    return clamp( mix( a, tmp, alpha ), 0.0, 1.0 );
}
vec3 spe_blend( vec3 a, vec3 b, float alpha, int mode ) {
    if ( mode == 0 ) return spe_normalBlend( a, b, alpha );
    else if ( mode == 1 ) return spe_multiplyBlend( a, b, alpha );
    else if ( mode == 2 ) return spe_screenBlend( a, b, alpha );
    else if ( mode == 3 ) return spe_overlayBlend( a, b, alpha );
    return vec3( 1.0 );
}
vec3 packNormalToRGB( const in vec3 normal ) {
    return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
    return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;
const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
    vec4 r = vec4( fract( v * PackFactors ), v );
    r.yzw -= r.xyz * ShiftRight8;
    return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
    return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
    return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
    return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
    vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
    return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
    return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
    return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
    return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
    return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
    return ( near * far ) / ( ( far - near ) * invClipZ - far );
}
float pow2( const in float x ) {
    return x*x;
}
vec3 pow2( const in vec3 x ) {
    return x*x;
}
float pow3( const in float x ) {
    return x*x*x;
}
float pow4( const in float x ) {
    float x2 = x*x;
    return x2*x2;
}
float max3( const in vec3 v ) {
    return max( max( v.x, v.y ), v.z );
}
float average( const in vec3 v ) {
    return dot( v, vec3( 0.3333333 ) );
}
highp float rand( const in vec2 uv ) {
    const highp float a = 12.9898, b = 78.233, c = 43758.5453;
    highp float dt = dot( uv.xy, vec2( a, b ) ), sn = mod( dt, 3.141592653589793 );
    return fract( sin( sn ) * c );
}
float precisionSafeLength( vec3 v ) {
    return length( v );
}
struct IncidentLight {
    vec3 color;
    vec3 direction;
    bool visible;
};
struct ReflectedLight {
    vec3 directDiffuse;
    vec3 directSpecular;
    vec3 indirectDiffuse;
    vec3 indirectSpecular;
};
struct GeometricContext {
    vec3 position;
    vec3 normal;
    vec3 viewDir;
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
    return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
    return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
    mat3 tmp;
    tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
    tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
    tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
    return tmp;
}
float luminance( const in vec3 rgb ) {
    const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
    return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
    return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
    float u = atan( dir.z, dir.x ) * 0.15915494309189535 + 0.5;
    float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * 0.3183098861837907 + 0.5;
    return vec2( u, v );
}
float neighbor_offset = 0.0001;
//uniform old move
//this varying
// out vec4 vCurrentPosition;
// out vec4 vPreviousPosition;
// out vec3 vViewPosition;
// out vec3 vWPosition;
// out vec3 vNormal;
// out vec2 vUv;
// out vec3 vPosition;
// out vec3 vWNormal;
// out vec3 vWorldViewDir;

varying vec4 vCurrentPosition;
varying vec4 vPreviousPosition;
varying vec3 vViewPosition;
varying vec3 vWPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vWNormal;
varying vec3 vWorldViewDir;

void main() {
    vec3 objectNormal = vec3( normal );
    vec3 transformedNormal = objectNormal;
    transformedNormal = normalMatrix * transformedNormal;
    vec3 displaced_position = position;
    vec3 displaced_normal = objectNormal;
    vNormal = normalize( transformedNormal );
    vec3 transformed = vec3( position );
    transformed = displaced_position;
    transformedNormal = normalMatrix * displaced_normal;
    vNormal = transformedNormal;
    vec4 mvPosition = vec4( transformed, 1.0 );
    mvPosition = modelViewMatrix * mvPosition;
    gl_Position = projectionMatrix * mvPosition;
    vViewPosition = - mvPosition.xyz;
    vec4 worldPosition = vec4( transformed, 1.0 );
    worldPosition = modelMatrix * worldPosition;
    vWPosition = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;
    vUv = uv;
    vPosition = transformed;
    vWNormal = inverseTransformDirection( transformedNormal, viewMatrix ).xyz;
    vWorldViewDir = isPerspectiveMatrix( projectionMatrix ) ?  ( (modelMatrix * vec4(position, 1.0)).xyz - cameraPosition ) : vec3( -viewMatrix[0][2], -viewMatrix[1][2], -viewMatrix[2][2] );
}
`
export const vertRock2 = `
precision mediump sampler2DArray;
precision highp float;
precision highp int;


vec3 spe_normalBlend( vec3 a, vec3 b, float alpha ) {
    return mix( a, b, alpha );
}
vec3 spe_multiplyBlend( vec3 a, vec3 b, float alpha ) {
    return mix( a, a * b, alpha );
}
vec3 spe_screenBlend( vec3 a, vec3 b, float alpha ) {
    vec3 tmp = 1.0 - ( 1.0 - a ) * ( 1.0 - b );
    return mix( a, tmp, alpha );
}
vec3 spe_overlayBlend( vec3 a, vec3 b, float alpha ) {
    vec3 tmp = mix( 1. - 2. * (1. - a) * (1. - b), 2. * a * b, step( a, vec3(.5) ) );
    return clamp( mix( a, tmp, alpha ), 0.0, 1.0 );
}
vec3 spe_blend( vec3 a, vec3 b, float alpha, int mode ) {
    if ( mode == 0 ) return spe_normalBlend( a, b, alpha );
    else if ( mode == 1 ) return spe_multiplyBlend( a, b, alpha );
    else if ( mode == 2 ) return spe_screenBlend( a, b, alpha );
    else if ( mode == 3 ) return spe_overlayBlend( a, b, alpha );
    return vec3( 1.0 );
}
vec3 packNormalToRGB( const in vec3 normal ) {
    return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
    return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;
const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
    vec4 r = vec4( fract( v * PackFactors ), v );
    r.yzw -= r.xyz * ShiftRight8;
    return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
    return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
    return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
    return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
    vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
    return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
    return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
    return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
    return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
    return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
    return ( near * far ) / ( ( far - near ) * invClipZ - far );
}
float pow2( const in float x ) {
    return x*x;
}
vec3 pow2( const in vec3 x ) {
    return x*x;
}
float pow3( const in float x ) {
    return x*x*x;
}
float pow4( const in float x ) {
    float x2 = x*x;
    return x2*x2;
}
float max3( const in vec3 v ) {
    return max( max( v.x, v.y ), v.z );
}
float average( const in vec3 v ) {
    return dot( v, vec3( 0.3333333 ) );
}
highp float rand( const in vec2 uv ) {
    const highp float a = 12.9898, b = 78.233, c = 43758.5453;
    highp float dt = dot( uv.xy, vec2( a, b ) ), sn = mod( dt, 3.141592653589793 );
    return fract( sin( sn ) * c );
}
float precisionSafeLength( vec3 v ) {
    return length( v );
}
struct IncidentLight {
    vec3 color;
    vec3 direction;
    bool visible;
};
struct ReflectedLight {
    vec3 directDiffuse;
    vec3 directSpecular;
    vec3 indirectDiffuse;
    vec3 indirectSpecular;
};
struct GeometricContext {
    vec3 position;
    vec3 normal;
    vec3 viewDir;
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
    return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
    return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
    mat3 tmp;
    tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
    tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
    tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
    return tmp;
}
float luminance( const in vec3 rgb ) {
    const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
    return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
    return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
    float u = atan( dir.z, dir.x ) * 0.15915494309189535 + 0.5;
    float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * 0.3183098861837907 + 0.5;
    return vec2( u, v );
}
float neighbor_offset = 0.0001;
uniform int frameIndex;
uniform vec2 resolution;
uniform mat4 previousModelViewMatrix;
uniform mat4 previousProjectionMatrix;
out vec4 vCurrentPosition;
out vec4 vPreviousPosition;
out vec3 vViewPosition;
out vec3 vWPosition;
out vec3 vLightFront;
out vec3 vIndirectFront;
out vec3 vLightBack;
out vec3 vIndirectBack;
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
    return 0.3183098861837907 * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
    float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
    return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
    float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
    return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
    float a2 = pow2( alpha );
    float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
    float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
    return 0.5 / max( gv + gl, 1e-6 );
}
float D_GGX( const in float alpha, const in float dotNH ) {
    float a2 = pow2( alpha );
    float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
    return 0.3183098861837907 * a2 / pow2( denom );
}
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {
    float alpha = pow2( roughness );
    vec3 halfDir = normalize( lightDir + viewDir );
    float dotNL = clamp( dot( normal, lightDir ), 0.0, 1.0 );
    float dotNV = clamp( dot( normal, viewDir ), 0.0, 1.0 );
    float dotNH = clamp( dot( normal, halfDir ), 0.0, 1.0 );
    float dotVH = clamp( dot( viewDir, halfDir ), 0.0, 1.0 );
    vec3 F = F_Schlick( f0, f90, dotVH );
    float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
    float D = D_GGX( alpha, dotNH );
    return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
    const float LUT_SIZE = 64.0;
    const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
    const float LUT_BIAS = 0.5 / LUT_SIZE;
    float dotNV = clamp( dot( N, V ), 0.0, 1.0 );
    vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
    uv = uv * LUT_SCALE + LUT_BIAS;
    return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
    float l = length( f );
    return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
    float x = dot( v1, v2 );
    float y = abs( x );
    float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
    float b = 3.4175940 + ( 4.1616724 + y ) * y;
    float v = a / b;
    float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
    return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
    vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
    vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
    vec3 lightNormal = cross( v1, v2 );
    if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
    vec3 T1, T2;
    T1 = normalize( V - N * dot( V, N ) );
    T2 = - cross( N, T1 );
    mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
    vec3 coords[ 4 ];
    coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
    coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
    coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
    coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
    coords[ 0 ] = normalize( coords[ 0 ] );
    coords[ 1 ] = normalize( coords[ 1 ] );
    coords[ 2 ] = normalize( coords[ 2 ] );
    coords[ 3 ] = normalize( coords[ 3 ] );
    vec3 vectorFormFactor = vec3( 0.0 );
    vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
    vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
    vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
    vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
    float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
    return vec3( result );
}
float G_BlinnPhong_Implicit( ) {
    return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
    return 0.3183098861837907 * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
    vec3 halfDir = normalize( lightDir + viewDir );
    float dotNH = clamp( dot( normal, halfDir ), 0.0, 1.0 );
    float dotVH = clamp( dot( viewDir, halfDir ), 0.0, 1.0 );
    vec3 F = F_Schlick( specularColor, 1.0, dotVH );
    float G = G_BlinnPhong_Implicit( );
    float D = D_BlinnPhong( shininess, dotNH );
    return F * ( G * D );
}
uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
    float x = normal.x, y = normal.y, z = normal.z;
    vec3 result = shCoefficients[ 0 ] * 0.886227;
    result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
    result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
    result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
    result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
    result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
    result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
    result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
    result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
    return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
    vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
    vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
    return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
    vec3 irradiance = ambientLightColor;
    return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
    if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
        return pow( clamp( - lightDistance / cutoffDistance + 1.0, 0.0, 1.0 ), decayExponent );
    }
    return 1.0;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
    return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
struct DirectionalLight {
    vec3 direction;
    vec3 color;
};
uniform DirectionalLight directionalLights[ 1 ];
void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
    light.color = directionalLight.color;
    light.direction = directionalLight.direction;
    light.visible = true;
}
struct HemisphereLight {
    vec3 direction;
    vec3 skyColor;
    vec3 groundColor;
};
uniform HemisphereLight hemisphereLights[ 1 ];
vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
    float dotNL = dot( normal, hemiLight.direction );
    float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
    vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
    return irradiance;
}
out vec3 vColor;
out vec3 vNormal;
out vec2 vUv;
out vec3 vPosition;
out vec3 vWNormal;
out vec3 vWorldViewDir;
void main() {
    vec3 objectNormal = vec3( normal );
    vec3 transformedNormal = objectNormal;
    transformedNormal = normalMatrix * transformedNormal;
    vec3 displaced_position = position;
    vec3 displaced_normal = normal;
    vNormal = normalize( transformedNormal );
    vec3 transformed = vec3( position );
    transformed = displaced_position;
    transformedNormal = normalMatrix * displaced_normal;
    vNormal = transformedNormal;
    vec4 mvPosition = vec4( transformed, 1.0 );
    mvPosition = modelViewMatrix * mvPosition;
    gl_Position = projectionMatrix * mvPosition;
    vViewPosition = - mvPosition.xyz;
    vec4 worldPosition = vec4( transformed, 1.0 );
    worldPosition = modelMatrix * worldPosition;
    vec3 diffuse = vec3( 1.0 );
    GeometricContext geometry;
    geometry.position = mvPosition.xyz;
    geometry.normal = normalize( transformedNormal );
    geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( -mvPosition.xyz );
    GeometricContext backGeometry;
    backGeometry.position = geometry.position;
    backGeometry.normal = -geometry.normal;
    backGeometry.viewDir = geometry.viewDir;
    vLightFront = vec3( 0.0 );
    vIndirectFront = vec3( 0.0 );
    vLightBack = vec3( 0.0 );
    vIndirectBack = vec3( 0.0 );
    IncidentLight directLight;
    float dotNL;
    vec3 directLightColor_Diffuse;
    vIndirectFront += getAmbientLightIrradiance( ambientLightColor );
    vIndirectFront += getLightProbeIrradiance( lightProbe, geometry.normal );
    vIndirectBack += getAmbientLightIrradiance( ambientLightColor );
    vIndirectBack += getLightProbeIrradiance( lightProbe, backGeometry.normal );
    getDirectionalLightInfo( directionalLights[ 0 ], geometry, directLight );
    dotNL = dot( geometry.normal, directLight.direction );
    directLightColor_Diffuse = directLight.color;
    vLightFront += clamp( dotNL, 0.0, 1.0 ) * directLightColor_Diffuse;
    vLightBack += clamp( -dotNL, 0.0, 1.0 ) * directLightColor_Diffuse;
    vIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ 0 ], geometry.normal );
    vIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ 0 ], backGeometry.normal );
    vWPosition = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;
    vUv = uv;
    vPosition = transformed;
    vWNormal = inverseTransformDirection( transformedNormal, viewMatrix ).xyz;
    vWorldViewDir = isPerspectiveMatrix( projectionMatrix ) ?  ( (modelMatrix * vec4(position, 1.0)).xyz - cameraPosition ) : vec3( -viewMatrix[0][2], -viewMatrix[1][2], -viewMatrix[2][2] );
}

`
