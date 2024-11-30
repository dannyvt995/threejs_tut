
const headFrag =  `

// uniform mat4 viewMatrix;
// uniform vec3 cameraPosition;
// uniform bool isOrthographic;
// vec4 LinearToLinear( in vec4 value ) {
//     return value;
// }
// vec4 LinearTosRGB( in vec4 value ) {
//     return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
// }
// vec4 linearToOutputTexel( vec4 value ) {
//     return LinearToLinear( value );
// }


const float PackUpscale = 256. / 255.;
const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;



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
float accumAlpha = 0.0;
void accumulateAlpha(float alpha) {
    accumAlpha += (1.0 - accumAlpha) * alpha;
}


varying vec4 vCurrentPosition;
varying vec4 vPreviousPosition;
const vec2 haltonSequence[16] = vec2[16](
vec2( 0.000000, -0.333334), vec2(-0.500000, 0.333334), vec2( 0.500000, -0.777778), vec2(-0.750000, -0.111112), vec2( 0.250000, 0.555556), vec2(-0.250000, -0.555556), vec2( 0.750000, 0.111112), vec2(-0.875000, 0.777778), vec2(0.125000, -0.925926), vec2(-0.375000, -0.259260), vec2(0.625000, 0.407408), vec2(-0.625000, -0.703704), vec2(0.375000, -0.037038), vec2(-0.125000, 0.629630), vec2(0.875000, -0.481482), vec2(-0.937500, 0.185186));
vec2 vogelDiskSample(int sampleIndex, int sampleCount, float angle) {
    const float goldenAngle = 2.399963f;
    float r = sqrt(float(sampleIndex) + 0.5f) / sqrt(float(sampleCount));
    float theta = float(sampleIndex) * goldenAngle + angle;
    float sine = sin(theta);
    float cosine = cos(theta);
    return vec2(cosine, sine) * r;
}
float getNoiseInterleavedGradient(vec2 screenPos) {
    vec3 magic = vec3(0.06711056f, 0.00583715f, 52.9829189f);
    return fract(magic.z * fract(dot(screenPos, magic.xy)));
}

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

void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
    light.color = directionalLight.color;
    light.direction = directionalLight.direction;
    light.visible = true;
}



vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
    float dotNL = dot( normal, hemiLight.direction );
    float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
    vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
    return irradiance;
}
varying vec3 vViewPosition;
struct BlinnPhongMaterial {
    vec3 diffuseColor;
    vec3 specularColor;
    float specularShininess;
    float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
    float dotNL = clamp( dot( geometry.normal, directLight.direction ), 0.0, 1.0 );
    vec3 irradiance = dotNL * directLight.color;
    reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
    reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
    reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
const float  gPenumbraFilterSize = 80.0;
const int   gPenumbraSamples = 8;
const int gShadowSamples = 8;
const float gShadowSamplesRpc = 1.0f / float(gShadowSamples);
vec3 dithering( vec3 color ) {
    float grid_position = rand( gl_FragCoord.xy );
    vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
    dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
    return color + dither_shift_RGB;
}
float w0( float a ) {
    return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
}
float w1( float a ) {
    return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
}
float w2( float a ) {
    return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
}
float w3( float a ) {
    return ( 1.0 / 6.0 ) * ( a * a * a );
}
float g0( float a ) {
    return w0( a ) + w1( a );
}
float g1( float a ) {
    return w2( a ) + w3( a );
}
float h0( float a ) {
    return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
}
float h1( float a ) {
    return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
}
vec4 bicubic( sampler2D tex, vec2 vUv, vec4 texelSize, float lod ) {
    vUv = vUv * texelSize.zw + 0.5;
    vec2 iuv = floor( vUv );
    vec2 fuv = fract( vUv );
    float g0x = g0( fuv.x );
    float g1x = g1( fuv.x );
    float h0x = h0( fuv.x );
    float h1x = h1( fuv.x );
    float h0y = h0( fuv.y );
    float h1y = h1( fuv.y );
    vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
    vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
    vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
    vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
    return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) + 
    g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
}
vec4 textureBicubic( sampler2D sampler, vec2 vUv, float lod ) {
    vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
    vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
    vec2 fLodSizeInv = 1.0 / fLodSize;
    vec2 cLodSizeInv = 1.0 / cLodSize;
    vec4 fSample = bicubic( sampler, vUv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
    vec4 cSample = bicubic( sampler, vUv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
    return mix( fSample, cSample, fract( lod ) );
}
float applyIorToRoughness( float roughness, float ior ) {
    return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
}
vec3 blur(sampler2D sp, vec2 U, vec2 scale, float lod, sampler2D dm, vec2 unrefractedU, vec2 aspectRatio) {
    if (lod == 0.0) {
        return textureLod( sp, U, 0.0).rgb;
    }
    vec2 texelSize = vec2(1.0) / resolution;
    vec2 halton = haltonSequence[frameIndex];
    float temporalOffset = getNoiseInterleavedGradient(gl_FragCoord.xy + halton);
    float temporalAngle = temporalOffset * 6.283185307179586;
    vec3 res = vec3(0.0);
    vec2 vUv = vec2(0.0);
    vec2 offset = vec2(0.0);
    vec2 vogelSample = vec2(0.0);
    for (int i = 0; i < 6; i++) {
        vogelSample = vogelDiskSample(i, 6, temporalAngle) * texelSize;
        offset = vogelSample * scale * (lod * 10.0);
        vUv = U + offset;
        float opaqueDepth = unpackRGBAToDepth(textureLod(dm, vUv, lod));
        if (opaqueDepth != 0.0 && opaqueDepth < gl_FragCoord.z) {
            vUv = unrefractedU;
            lod = lod > 4.0 ? lod : lod / 2.0;
        }
        res += textureLod(sp, vUv, lod).rgb;
    }
    return res / float(6);
}
vec3 getVolumeTransmissionRay( vec3 n, vec3 v, float thickness, float ior, mat4 modelMatrix ) {
    vec3 refractionVector = refract( -v, n, 1.0 / ior );
    vec3 modelScale;
    modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
    modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
    modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
    return normalize( refractionVector ) * thickness * modelScale;
}
float vectorLinearWorldSpaceDepth(vec3 direction, vec3 origin, float near, float far) {
    vec3 n = normalize(direction);
    float dist = (n.x*(vWPosition.x - origin.x) + n.y*(vWPosition.y - origin.y) + n.z*(vWPosition.z - origin.z));
    return ( dist - near ) / ( far - near );
}
float vectorLinearObjectSpaceDepth(vec3 direction, vec3 origin, float near, float far) {
    vec3 n = normalize(direction);
    float dist = (n.x*(vPosition.x - origin.x) + n.y*(vPosition.y - origin.y) + n.z*(vPosition.z - origin.z));
    return ( dist - near ) / ( far - near );
}
float vectorSphericalObjectSpaceDepth(vec3 origin, float near, float far) {
    float dist = length(vPosition - origin);
    return ( dist - near ) / ( far - near );
}
float vectorSphericalWorldSpaceDepth(vec3 origin, float near, float far) {
    float dist = length(vWPosition - origin);
    return ( dist - near ) / ( far - near );
}
vec3 fresnel(vec3 color, float bias, float scale, float intensity, float factor, bool isMask, float mask, float alpha, int mode, out float calpha) {
    float fresnel = bias + scale * pow( abs( factor + dot( normalize( vWorldViewDir ), normalize( vWNormal ) ) ), intensity );
    float lalpha = clamp(fresnel, 0.0, 1.0) * alpha * mask;
    calpha = mix(lalpha / clamp(lalpha + accumAlpha, 0.00001, 1.0), lalpha, float(isMask));
    accumAlpha += (1.0 - accumAlpha) * lalpha * (1.0 - float(isMask));
    return color;
}
vec3 getTransmissionSample( vec2 fragCoord, float roughness, float ior, vec2 transmissionSamplerSize, sampler2D transmissionSamplerMap, sampler2D transmissionDepthMap, vec2 unrefractedCoords, vec2 aspectRatio) {
    float lod = log2(transmissionSamplerSize.x) * applyIorToRoughness(roughness / 5.0, ior);
    return textureBicubic(transmissionSamplerMap, fragCoord.xy, lod).rgb;
}
vec3 g6430cc0327844879bf7220651b2a8211_sdepth(float near, float far, vec3 origin, vec3 direction, vec4 colors[4], float steps[4], bool isMask, float mask, float alpha, out float calpha) {
    vec4 color = colors[0];
    float depth = vectorSphericalObjectSpaceDepth(origin, near, far);
    float p;
    for ( int i = 1; i < 4; i++ ) {
        p = clamp(( depth - steps[i - 1] ) / ( steps[i] - steps[i - 1] ), 0.0, 1.0);
        color = mix(color, colors[i], p);
    }
    float lalpha = alpha * color.a * mask;
    calpha = mix(lalpha / clamp(lalpha + accumAlpha, 0.00001, 1.0), lalpha, float(isMask));
    accumAlpha += (1.0 - accumAlpha) * lalpha * (1.0 - float(isMask));
    return color.rgb;
}
vec3 getIBLVolumeRefraction( vec3 n, vec3 v, float roughness, vec3 position, mat4 modelMatrix, mat4 viewMatrix, mat4 projMatrix, float ior, float thickness, vec2 transmissionSamplerSize, sampler2D transmissionSamplerMap, sampler2D transmissionDepthMap, vec2 aspectRatio ) {
    vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
    vec3 refractedRayExit = position + transmissionRay;
    vec4 ndcPos = projMatrix * viewMatrix *  vec4( refractedRayExit, 1.0 );
    vec2 refractionCoords = ndcPos.xy / ndcPos.w;
    refractionCoords += 1.0;
    refractionCoords /= 2.0;
    vec4 ndcPosUnrefracted = projMatrix * viewMatrix * vec4(position, 1.0 );
    vec2 unrefractedCoords = ndcPosUnrefracted.xy / ndcPosUnrefracted.w;
    unrefractedCoords += 1.0;
    unrefractedCoords /= 2.0;
    return getTransmissionSample( refractionCoords, roughness, ior, transmissionSamplerSize, transmissionSamplerMap, transmissionDepthMap, unrefractedCoords, aspectRatio );
}
vec3 transmission(float thickness, float ior, float roughness, vec2 transmissionSamplerSize, sampler2D transmissionSamplerMap, sampler2D transmissionDepthMap, vec2 aspectRatio, vec3 normal, float mask, float alpha, out float calpha) {
    vec3 v = vec3(0.);
    if (isOrthographic) {
        v = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
    }
    else {
        v = normalize(vWPosition - cameraPosition);
    }
    vec3 transmission = getIBLVolumeRefraction(vWNormal, -v, roughness, vWPosition, modelMatrix, viewMatrix, projectionMatrix, ior, thickness, transmissionSamplerSize, transmissionSamplerMap, transmissionDepthMap, aspectRatio );
    float lalpha = alpha * mask;
    calpha = lalpha / clamp( lalpha + accumAlpha, 0.00001, 1.0 );
    accumAlpha += ( 1.0 - accumAlpha ) * alpha;
    return transmission;
}
`

export const fragRock0 = `

precision highp float;
precision highp int;
varying vec2 vUv;
varying vec3 vPosition;
uniform mat4 modelMatrix;
uniform mat4 projectionMatrix;
varying vec3 vWNormal;
varying vec3 vWorldViewDir;
uniform float nodeU0;
uniform float nodeU1;
uniform float nodeU2;
uniform vec2 nodeU3;
uniform sampler2D nodeU4;
uniform sampler2D nodeU5;
uniform vec2 nodeU6;
uniform float nodeU7;
uniform float nodeU8;
uniform float nodeU9;
uniform vec3 nodeU10;
uniform vec3 nodeU11;
uniform bool nodeU12;
uniform float nodeU13;
uniform int nodeU14;
uniform vec3 nodeU15;
uniform float nodeU16;
uniform float nodeU17;
uniform float nodeU18;
uniform float nodeU19;
uniform bool nodeU20;
uniform float nodeU21;
uniform int nodeU22;
uniform vec3 nodeU23;
uniform float nodeU24;
uniform float nodeU25;
uniform float nodeU26;
uniform float nodeU27;
uniform bool nodeU28;
uniform float nodeU29;
uniform int nodeU30;
uniform vec3 nodeU31;
uniform float nodeU32;
uniform bool nodeU33;
uniform float nodeU34;
uniform int nodeU35;
uniform float nodeU36;
uniform float nodeU37;
uniform vec4 nodeUA0[4];
uniform float nodeUA1[4];
varying vec3 vWPosition;
uniform int frameIndex;
uniform vec2 resolution;
uniform vec3 emissive;
uniform float penumbraSize[5];
uniform sampler2D aoMap;
uniform bool aoEnabled;
varying vec3 vNormal;
uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];

struct DirectionalLight {
    vec3 direction;
    vec3 color;
};


uniform DirectionalLight directionalLights[ 1 ];


struct HemisphereLight {
    vec3 direction;
    vec3 skyColor;
    vec3 groundColor;
};

uniform HemisphereLight hemisphereLights[ 1 ];

${headFrag}
void main() {
    float rock0101_calpha;
    float rock0102_calpha;
    float rock0103_calpha;
    float rock0104_calpha;
    float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
    vec3 normal = normalize( vNormal );
    vec3 geometryNormal = normal;
    vec3 viewdx = dFdx(vViewPosition);
    vec3 viewdy = dFdy(vViewPosition);
    vec3 faceNormal = normalize(cross(viewdx, viewdy));
    if (dot(normal, faceNormal) < 0.0) {
        normal *= -1.0;
    }
    BlinnPhongMaterial material;
    vec3 diffuseColor = spe_blend(spe_blend(spe_blend(transmission(nodeU0, nodeU1, nodeU2, nodeU3, nodeU4, nodeU5, nodeU6, normal, 1.0, nodeU7, rock0101_calpha), g6430cc0327844879bf7220651b2a8211_sdepth(nodeU8, nodeU9, nodeU10, nodeU11, nodeUA0, nodeUA1, nodeU12, 1.0, nodeU13, rock0102_calpha), ( rock0102_calpha ), nodeU14), fresnel(nodeU15, nodeU16, nodeU17, nodeU18, nodeU19, nodeU20, 1.0, nodeU21, nodeU22, rock0103_calpha), ( rock0103_calpha ), nodeU22), fresnel(nodeU23, nodeU24, nodeU25, nodeU26, nodeU27, nodeU28, 1.0, nodeU29, nodeU30, rock0104_calpha), ( rock0104_calpha ), nodeU30);
    ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
    vec3 totalEmissiveRadiance = emissive;
    vec3 specular = nodeU31;
    float shininess = max( 0.0001, nodeU32 );
    float specularStrength = 1.0;
    material.diffuseColor = diffuseColor;
    material.specularColor = specular;
    material.specularShininess = shininess;
    material.specularStrength = specularStrength;
    GeometricContext geometry;
    geometry.position = - vViewPosition;
    geometry.normal = normal;
    geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
    IncidentLight directLight;
    DirectionalLight directionalLight;
    directionalLight = directionalLights[ 0 ];
    getDirectionalLightInfo( directionalLight, geometry, directLight );
    RE_Direct_BlinnPhong( directLight, geometry, material, reflectedLight );
    vec3 iblIrradiance = vec3( 0.0 );
    vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
    irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
    irradiance += getHemisphereLightIrradiance( hemisphereLights[ 0 ], geometry.normal );
    RE_IndirectDiffuse_BlinnPhong( irradiance, geometry, material, reflectedLight );
    vec3 ao = aoEnabled && nodeU33 ? texture(aoMap, gl_FragCoord.xy / resolution).rgb : vec3(1.0);
    vec3 outgoingLight = ((reflectedLight.directDiffuse + reflectedLight.indirectDiffuse)) + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
    if (outgoingLight != diffuseColor) {
        float lightAccu = clamp( length( reflectedLight.directSpecular + reflectedLight.indirectSpecular ), 0.0, 1.0 );
        accumAlpha += ( 1.0 - accumAlpha ) * nodeU34 * 1.0 * lightAccu;
        outgoingLight = spe_blend( diffuseColor, outgoingLight, nodeU34 * 1.0, nodeU35 );
        outgoingLight *= ao;
    }
    gl_FragColor = vec4( outgoingLight, accumAlpha * nodeU36);
    gl_FragColor.a *= nodeU37;
    gl_FragColor = linearToOutputTexel( gl_FragColor );
    gl_FragColor.rgb = dithering( gl_FragColor.rgb );
    
    //gl_FragColor = texture2D(nodeU4,vUv);
   // gl_FragColor.rgb = vec3(1.,0.,0.);
}

`
export const fragRock2 = `

precision highp float;
precision highp int;
// uniform mat4 viewMatrix;
// uniform vec3 cameraPosition;
// uniform bool isOrthographic;
// vec4 LinearToLinear( in vec4 value ) {
//     return value;
// }
// vec4 LinearTosRGB( in vec4 value ) {
//     return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
// }
// vec4 linearToOutputTexel( vec4 value ) {
//     return LinearToLinear( value );
// }
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
float accumAlpha = 0.0;
void accumulateAlpha(float alpha) {
    accumAlpha += (1.0 - accumAlpha) * alpha;
}

uniform int frameIndex;
uniform vec2 resolution;
varying vec4 vCurrentPosition;
varying vec4 vPreviousPosition;
const vec2 haltonSequence[16] = vec2[16](
vec2( 0.000000, -0.333334), vec2(-0.500000, 0.333334), vec2( 0.500000, -0.777778), vec2(-0.750000, -0.111112), vec2( 0.250000, 0.555556), vec2(-0.250000, -0.555556), vec2( 0.750000, 0.111112), vec2(-0.875000, 0.777778), vec2(0.125000, -0.925926), vec2(-0.375000, -0.259260), vec2(0.625000, 0.407408), vec2(-0.625000, -0.703704), vec2(0.375000, -0.037038), vec2(-0.125000, 0.629630), vec2(0.875000, -0.481482), vec2(-0.937500, 0.185186));
vec2 vogelDiskSample(int sampleIndex, int sampleCount, float angle) {
    const float goldenAngle = 2.399963f;
    float r = sqrt(float(sampleIndex) + 0.5f) / sqrt(float(sampleCount));
    float theta = float(sampleIndex) * goldenAngle + angle;
    float sine = sin(theta);
    float cosine = cos(theta);
    return vec2(cosine, sine) * r;
}
float getNoiseInterleavedGradient(vec2 screenPos) {
    vec3 magic = vec3(0.06711056f, 0.00583715f, 52.9829189f);
    return fract(magic.z * fract(dot(screenPos, magic.xy)));
}
uniform float penumbraSize[5];
uniform sampler2D aoMap;
uniform bool aoEnabled;
varying vec3 vViewPosition;
varying vec3 vWPosition;
varying vec3 vLightFront;
varying vec3 vIndirectFront;
varying vec3 vNormal;
varying vec3 vLightBack;
varying vec3 vIndirectBack;
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
const float  gPenumbraFilterSize = 80.0;
const int   gPenumbraSamples = 8;
const int gShadowSamples = 8;
const float gShadowSamplesRpc = 1.0f / float(gShadowSamples);
float getShadowMask() {
    float shadow = 1.0;
    return shadow;
}
vec3 dithering( vec3 color ) {
    float grid_position = rand( gl_FragCoord.xy );
    vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
    dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
    return color + dither_shift_RGB;
}
varying vec2 vUv;
varying vec3 vPosition;
uniform mat4 modelMatrix;
uniform mat4 projectionMatrix;
varying vec3 vWNormal;
varying vec3 vWorldViewDir;
uniform float nodeU0;
uniform float nodeU1;
uniform float nodeU2;
uniform vec2 nodeU3;
uniform sampler2D nodeU4;
uniform sampler2D nodeU5;
uniform vec2 nodeU6;
uniform float nodeU7;
uniform float nodeU8;
uniform float nodeU9;
uniform vec3 nodeU10;
uniform vec3 nodeU11;
uniform bool nodeU12;
uniform float nodeU13;
uniform int nodeU14;
uniform vec3 nodeU15;
uniform float nodeU16;
uniform float nodeU17;
uniform float nodeU18;
uniform float nodeU19;
uniform bool nodeU20;
uniform float nodeU21;
uniform int nodeU22;
uniform float nodeU23;
uniform int nodeU24;
uniform float nodeU25;
uniform vec3 nodeU26;
uniform float nodeU27;
uniform bool nodeU28;
uniform float nodeU29;
uniform vec4 nodeUA0[4];
uniform float nodeUA1[4];
float w0( float a ) {
    return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
}
float w1( float a ) {
    return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
}
float w2( float a ) {
    return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
}
float w3( float a ) {
    return ( 1.0 / 6.0 ) * ( a * a * a );
}
float g0( float a ) {
    return w0( a ) + w1( a );
}
float g1( float a ) {
    return w2( a ) + w3( a );
}
float h0( float a ) {
    return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
}
float h1( float a ) {
    return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
}
vec4 bicubic( sampler2D tex, vec2 vUv, vec4 texelSize, float lod ) {
    vUv = vUv * texelSize.zw + 0.5;
    vec2 iuv = floor( vUv );
    vec2 fuv = fract( vUv );
    float g0x = g0( fuv.x );
    float g1x = g1( fuv.x );
    float h0x = h0( fuv.x );
    float h1x = h1( fuv.x );
    float h0y = h0( fuv.y );
    float h1y = h1( fuv.y );
    vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
    vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
    vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
    vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
    return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) + 
    g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
}
vec4 textureBicubic( sampler2D sampler, vec2 vUv, float lod ) {
    vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
    vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
    vec2 fLodSizeInv = 1.0 / fLodSize;
    vec2 cLodSizeInv = 1.0 / cLodSize;
    vec4 fSample = bicubic( sampler, vUv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
    vec4 cSample = bicubic( sampler, vUv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
    return mix( fSample, cSample, fract( lod ) );
}
float applyIorToRoughness( float roughness, float ior ) {
    return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
}
vec3 blur(sampler2D sp, vec2 U, vec2 scale, float lod, sampler2D dm, vec2 unrefractedU, vec2 aspectRatio) {
    if (lod == 0.0) {
        return textureLod( sp, U, 0.0).rgb;
    }
    vec2 texelSize = vec2(1.0) / resolution;
    vec2 halton = haltonSequence[frameIndex];
    float temporalOffset = getNoiseInterleavedGradient(gl_FragCoord.xy + halton);
    float temporalAngle = temporalOffset * 6.283185307179586;
    vec3 res = vec3(0.0);
    vec2 vUv = vec2(0.0);
    vec2 offset = vec2(0.0);
    vec2 vogelSample = vec2(0.0);
    for (int i = 0; i < 6; i++) {
        vogelSample = vogelDiskSample(i, 6, temporalAngle) * texelSize;
        offset = vogelSample * scale * (lod * 10.0);
        vUv = U + offset;
        float opaqueDepth = unpackRGBAToDepth(textureLod(dm, vUv, lod));
        if (opaqueDepth != 0.0 && opaqueDepth < gl_FragCoord.z) {
            vUv = unrefractedU;
            lod = lod > 4.0 ? lod : lod / 2.0;
        }
        res += textureLod(sp, vUv, lod).rgb;
    }
    return res / float(6);
}
vec3 getVolumeTransmissionRay( vec3 n, vec3 v, float thickness, float ior, mat4 modelMatrix ) {
    vec3 refractionVector = refract( -v, n, 1.0 / ior );
    vec3 modelScale;
    modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
    modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
    modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
    return normalize( refractionVector ) * thickness * modelScale;
}
float vectorLinearWorldSpaceDepth(vec3 direction, vec3 origin, float near, float far) {
    vec3 n = normalize(direction);
    float dist = (n.x*(vWPosition.x - origin.x) + n.y*(vWPosition.y - origin.y) + n.z*(vWPosition.z - origin.z));
    return ( dist - near ) / ( far - near );
}
float vectorLinearObjectSpaceDepth(vec3 direction, vec3 origin, float near, float far) {
    vec3 n = normalize(direction);
    float dist = (n.x*(vPosition.x - origin.x) + n.y*(vPosition.y - origin.y) + n.z*(vPosition.z - origin.z));
    return ( dist - near ) / ( far - near );
}
float vectorSphericalObjectSpaceDepth(vec3 origin, float near, float far) {
    float dist = length(vPosition - origin);
    return ( dist - near ) / ( far - near );
}
float vectorSphericalWorldSpaceDepth(vec3 origin, float near, float far) {
    float dist = length(vWPosition - origin);
    return ( dist - near ) / ( far - near );
}
vec3 fresnel(vec3 color, float bias, float scale, float intensity, float factor, bool isMask, float mask, float alpha, int mode, out float calpha) {
    float fresnel = bias + scale * pow( abs( factor + dot( normalize( vWorldViewDir ), normalize( vWNormal ) ) ), intensity );
    float lalpha = clamp(fresnel, 0.0, 1.0) * alpha * mask;
    calpha = mix(lalpha / clamp(lalpha + accumAlpha, 0.00001, 1.0), lalpha, float(isMask));
    accumAlpha += (1.0 - accumAlpha) * lalpha * (1.0 - float(isMask));
    return color;
}
vec3 getTransmissionSample( vec2 fragCoord, float roughness, float ior, vec2 transmissionSamplerSize, sampler2D transmissionSamplerMap, sampler2D transmissionDepthMap, vec2 unrefractedCoords, vec2 aspectRatio) {
    float lod = log2(transmissionSamplerSize.x) * applyIorToRoughness(roughness / 5.0, ior);
    return textureBicubic(transmissionSamplerMap, fragCoord.xy, lod).rgb;
}
vec3 g45819eb7f4e644c29af3be985cb6bd74_sdepth(float near, float far, vec3 origin, vec3 direction, vec4 colors[4], float steps[4], bool isMask, float mask, float alpha, out float calpha) {
    vec4 color = colors[0];
    float depth = vectorSphericalObjectSpaceDepth(origin, near, far);
    float p;
    for ( int i = 1; i < 4; i++ ) {
        p = clamp(( depth - steps[i - 1] ) / ( steps[i] - steps[i - 1] ), 0.0, 1.0);
        color = mix(color, colors[i], p);
    }
    float lalpha = alpha * color.a * mask;
    calpha = mix(lalpha / clamp(lalpha + accumAlpha, 0.00001, 1.0), lalpha, float(isMask));
    accumAlpha += (1.0 - accumAlpha) * lalpha * (1.0 - float(isMask));
    return color.rgb;
}
vec3 getIBLVolumeRefraction( vec3 n, vec3 v, float roughness, vec3 position, mat4 modelMatrix, mat4 viewMatrix, mat4 projMatrix, float ior, float thickness, vec2 transmissionSamplerSize, sampler2D transmissionSamplerMap, sampler2D transmissionDepthMap, vec2 aspectRatio ) {
    vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
    vec3 refractedRayExit = position + transmissionRay;
    vec4 ndcPos = projMatrix * viewMatrix *  vec4( refractedRayExit, 1.0 );
    vec2 refractionCoords = ndcPos.xy / ndcPos.w;
    refractionCoords += 1.0;
    refractionCoords /= 2.0;
    vec4 ndcPosUnrefracted = projMatrix * viewMatrix * vec4(position, 1.0 );
    vec2 unrefractedCoords = ndcPosUnrefracted.xy / ndcPosUnrefracted.w;
    unrefractedCoords += 1.0;
    unrefractedCoords /= 2.0;
    return getTransmissionSample( refractionCoords, roughness, ior, transmissionSamplerSize, transmissionSamplerMap, transmissionDepthMap, unrefractedCoords, aspectRatio );
}
vec3 transmission(float thickness, float ior, float roughness, vec2 transmissionSamplerSize, sampler2D transmissionSamplerMap, sampler2D transmissionDepthMap, vec2 aspectRatio, vec3 normal, float mask, float alpha, out float calpha) {
    vec3 v = vec3(0.);
    if (isOrthographic) {
        v = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
    }
    else {
        v = normalize(vWPosition - cameraPosition);
    }
    vec3 transmission = getIBLVolumeRefraction(vWNormal, -v, roughness, vWPosition, modelMatrix, viewMatrix, projectionMatrix, ior, thickness, transmissionSamplerSize, transmissionSamplerMap, transmissionDepthMap, aspectRatio );
    float lalpha = alpha * mask;
    calpha = lalpha / clamp( lalpha + accumAlpha, 0.00001, 1.0 );
    accumAlpha += ( 1.0 - accumAlpha ) * alpha;
    return transmission;
}
void main() {
    float g30e804c7e4a146f382f54e95af8745be_calpha;
    float g45819eb7f4e644c29af3be985cb6bd74_calpha;
    float gf421c76c78a341aab861703ac56697f3_calpha;
    float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
    vec3 normal = normalize( vNormal );
    normal = normal * faceDirection;
    vec3 geometryNormal = normal;
    vec3 viewdx = dFdx(vViewPosition);
    vec3 viewdy = dFdy(vViewPosition);
    vec3 faceNormal = normalize(cross(viewdx, viewdy));
    bool isFrontFacing = (dot(normal, faceNormal) >= 0.0);
    vec3 diffuseColor = spe_blend(spe_blend(transmission(nodeU0, nodeU1, nodeU2, nodeU3, nodeU4, nodeU5, nodeU6, normal, 1.0, nodeU7, g30e804c7e4a146f382f54e95af8745be_calpha), g45819eb7f4e644c29af3be985cb6bd74_sdepth(nodeU8, nodeU9, nodeU10, nodeU11, nodeUA0, nodeUA1, nodeU12, 1.0, nodeU13, g45819eb7f4e644c29af3be985cb6bd74_calpha), ( g45819eb7f4e644c29af3be985cb6bd74_calpha ), nodeU14), fresnel(nodeU15, nodeU16, nodeU17, nodeU18, nodeU19, nodeU20, 1.0, nodeU21, nodeU22, gf421c76c78a341aab861703ac56697f3_calpha), ( gf421c76c78a341aab861703ac56697f3_calpha ), nodeU22);
    ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
    reflectedLight.indirectDiffuse += ( isFrontFacing ) ? vIndirectFront : vIndirectBack;
    reflectedLight.indirectDiffuse *= BRDF_Lambert( diffuseColor.rgb );
    reflectedLight.directDiffuse = ( isFrontFacing ) ? vLightFront : vLightBack;
    reflectedLight.directDiffuse *= BRDF_Lambert( diffuseColor.rgb ) * getShadowMask();
    reflectedLight.directDiffuse += nodeU26 * nodeU27;
    vec3 ao = aoEnabled && nodeU28 ? texture(aoMap, gl_FragCoord.xy / resolution).rgb : vec3(1.0);
    vec3 outgoingLight = (reflectedLight.directDiffuse + reflectedLight.indirectDiffuse) ;
    if (outgoingLight != diffuseColor) {
        float lightAccu = clamp( length( reflectedLight.directSpecular + reflectedLight.indirectSpecular ), 0.0, 1.0 );
        accumAlpha += ( 1.0 - accumAlpha ) * nodeU23 * 1.0 * lightAccu;
        outgoingLight = spe_blend( diffuseColor, outgoingLight, nodeU23 * 1.0, nodeU24 );
        outgoingLight *= ao;
    }
    gl_FragColor = vec4( outgoingLight, accumAlpha * nodeU25 );
    gl_FragColor.a *= nodeU29;
    gl_FragColor = linearToOutputTexel( gl_FragColor );
    gl_FragColor.rgb = dithering( gl_FragColor.rgb );
}

`
export const fragRock1 = `


precision highp float;
precision highp int;
// uniform mat4 viewMatrix;
// uniform vec3 cameraPosition;
// uniform bool isOrthographic;
// vec4 LinearToLinear( in vec4 value ) {
//     return value;
// }
// vec4 LinearTosRGB( in vec4 value ) {
//     return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
// }
// vec4 linearToOutputTexel( vec4 value ) {
//     return LinearToLinear( value );
// }
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
float accumAlpha = 0.0;
void accumulateAlpha(float alpha) {
    accumAlpha += (1.0 - accumAlpha) * alpha;
}

uniform int frameIndex;
uniform vec2 resolution;
varying vec4 vCurrentPosition;
varying vec4 vPreviousPosition;
const vec2 haltonSequence[16] = vec2[16](
vec2( 0.000000, -0.333334), vec2(-0.500000, 0.333334), vec2( 0.500000, -0.777778), vec2(-0.750000, -0.111112), vec2( 0.250000, 0.555556), vec2(-0.250000, -0.555556), vec2( 0.750000, 0.111112), vec2(-0.875000, 0.777778), vec2(0.125000, -0.925926), vec2(-0.375000, -0.259260), vec2(0.625000, 0.407408), vec2(-0.625000, -0.703704), vec2(0.375000, -0.037038), vec2(-0.125000, 0.629630), vec2(0.875000, -0.481482), vec2(-0.937500, 0.185186));
vec2 vogelDiskSample(int sampleIndex, int sampleCount, float angle) {
    const float goldenAngle = 2.399963f;
    float r = sqrt(float(sampleIndex) + 0.5f) / sqrt(float(sampleCount));
    float theta = float(sampleIndex) * goldenAngle + angle;
    float sine = sin(theta);
    float cosine = cos(theta);
    return vec2(cosine, sine) * r;
}
float getNoiseInterleavedGradient(vec2 screenPos) {
    vec3 magic = vec3(0.06711056f, 0.00583715f, 52.9829189f);
    return fract(magic.z * fract(dot(screenPos, magic.xy)));
}
varying vec3 vViewPosition;
varying vec3 vWPosition;
uniform float penumbraSize[5];
uniform sampler2D aoMap;
uniform bool aoEnabled;
varying vec3 vNormal;
vec3 dithering( vec3 color ) {
    float grid_position = rand( gl_FragCoord.xy );
    vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
    dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
    return color + dither_shift_RGB;
}
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
struct PhysicalMaterial {
    vec3 diffuseColor;
    float roughness;
    vec3 specularColor;
    float specularF90;
    float transmission;
    float transmissionAlpha;
    float thickness;
    float attenuationDistance;
    vec3 attenuationColor;
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
    float dotNV = clamp( dot( normal, viewDir ), 0.0, 1.0 );
    float r2 = roughness * roughness;
    float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
    float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
    float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
    return clamp( DG * 0.3183098861837907, 0.0, 1.0 );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
    float dotNV = clamp( dot( normal, viewDir ), 0.0, 1.0 );
    const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
    const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
    vec4 r = roughness * c0 + c1;
    float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
    vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
    return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
    vec2 fab = DFGApprox( normal, viewDir, roughness );
    return specularColor * fab.x + specularF90 * fab.y;
}
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
    vec2 fab = DFGApprox( normal, viewDir, roughness );
    vec3 Fr = specularColor;
    vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
    float Ess = fab.x + fab.y;
    float Ems = 1.0 - Ess;
    vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;
    vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
    singleScatter += FssEss;
    multiScatter += Fms * Ems;
}
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
    float dotNL = clamp( dot( geometry.normal, directLight.direction ), 0.0, 1.0 );
    vec3 irradiance = dotNL * directLight.color;
    reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );
    reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
    reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
    vec3 singleScattering = vec3( 0.0 );
    vec3 multiScattering = vec3( 0.0 );
    vec3 cosineWeightedIrradiance = irradiance * 0.3183098861837907;
    computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
    vec3 totalScattering = singleScattering + multiScattering;
    vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
    reflectedLight.indirectSpecular += radiance * singleScattering;
    reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
    reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
    return clamp( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion, 0.0, 1.0 );
}
const float  gPenumbraFilterSize = 80.0;
const int   gPenumbraSamples = 8;
const int gShadowSamples = 8;
const float gShadowSamplesRpc = 1.0f / float(gShadowSamples);
varying vec2 vUv;
varying vec3 vPosition;
uniform mat4 modelMatrix;
uniform mat4 projectionMatrix;
varying vec3 vWNormal;
varying vec3 vWorldViewDir;

uniform float nodeU0;
uniform float nodeU1;
uniform float nodeU2;
uniform vec2 nodeU3;
uniform sampler2D nodeU4;
uniform sampler2D nodeU5;
uniform vec2 nodeU6;
uniform float nodeU7;
uniform float nodeU8;
uniform float nodeU9;
uniform vec3 nodeU10;
uniform vec3 nodeU11;
uniform bool nodeU12;
uniform float nodeU13;
uniform int nodeU14;
uniform vec3 nodeU15;
uniform float nodeU16;
uniform float nodeU17;
uniform float nodeU18;
uniform float nodeU19;
uniform bool nodeU20;
uniform float nodeU21;
uniform int nodeU22;
uniform vec3 nodeU23; 
uniform float nodeU24;
uniform float nodeU25;
uniform float nodeU26;
uniform float nodeU27;
uniform bool nodeU28;
uniform float nodeU29;
uniform int nodeU30;
uniform float nodeU31;
uniform float nodeU32;
uniform bool nodeU33;
uniform float nodeU34;
uniform int nodeU35;
uniform float nodeU36;
uniform float nodeU37;
uniform float nodeU38;
uniform vec4 nodeUA0[4];
uniform float nodeUA1[4];
float w0( float a ) {
    return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
}
float w1( float a ) {
    return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
}
float w2( float a ) {
    return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
}
float w3( float a ) {
    return ( 1.0 / 6.0 ) * ( a * a * a );
}
float g0( float a ) {
    return w0( a ) + w1( a );
}
float g1( float a ) {
    return w2( a ) + w3( a );
}
float h0( float a ) {
    return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
}
float h1( float a ) {
    return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
}
vec4 bicubic( sampler2D tex, vec2 vUv, vec4 texelSize, float lod ) {
    vUv = vUv * texelSize.zw + 0.5;
    vec2 iuv = floor( vUv );
    vec2 fuv = fract( vUv );
    float g0x = g0( fuv.x );
    float g1x = g1( fuv.x );
    float h0x = h0( fuv.x );
    float h1x = h1( fuv.x );
    float h0y = h0( fuv.y );
    float h1y = h1( fuv.y );
    vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
    vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
    vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
    vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
    return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) + 
    g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
}
vec4 textureBicubic( sampler2D sampler, vec2 vUv, float lod ) {
    vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
    vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
    vec2 fLodSizeInv = 1.0 / fLodSize;
    vec2 cLodSizeInv = 1.0 / cLodSize;
    vec4 fSample = bicubic( sampler, vUv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
    vec4 cSample = bicubic( sampler, vUv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
    return mix( fSample, cSample, fract( lod ) );
}
float applyIorToRoughness( float roughness, float ior ) {
    return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
}
vec3 blur(sampler2D sp, vec2 U, vec2 scale, float lod, sampler2D dm, vec2 unrefractedU, vec2 aspectRatio) {
    if (lod == 0.0) {
        return textureLod( sp, U, 0.0).rgb;
    }
    vec2 texelSize = vec2(1.0) / resolution;
    vec2 halton = haltonSequence[frameIndex];
    float temporalOffset = getNoiseInterleavedGradient(gl_FragCoord.xy + halton);
    float temporalAngle = temporalOffset * 6.283185307179586;
    vec3 res = vec3(0.0);
    vec2 vUv = vec2(0.0);
    vec2 offset = vec2(0.0);
    vec2 vogelSample = vec2(0.0);
    for (int i = 0; i < 6; i++) {
        vogelSample = vogelDiskSample(i, 6, temporalAngle) * texelSize;
        offset = vogelSample * scale * (lod * 10.0);
        vUv = U + offset;
        float opaqueDepth = unpackRGBAToDepth(textureLod(dm, vUv, lod));
        if (opaqueDepth != 0.0 && opaqueDepth < gl_FragCoord.z) {
            vUv = unrefractedU;
            lod = lod > 4.0 ? lod : lod / 2.0;
        }
        res += textureLod(sp, vUv, lod).rgb;
    }
    return res / float(6);
}
vec3 getVolumeTransmissionRay( vec3 n, vec3 v, float thickness, float ior, mat4 modelMatrix ) {
    vec3 refractionVector = refract( -v, n, 1.0 / ior );
    vec3 modelScale;
    modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
    modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
    modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
    return normalize( refractionVector ) * thickness * modelScale;
}
float vectorLinearWorldSpaceDepth(vec3 direction, vec3 origin, float near, float far) {
    vec3 n = normalize(direction);
    float dist = (n.x*(vWPosition.x - origin.x) + n.y*(vWPosition.y - origin.y) + n.z*(vWPosition.z - origin.z));
    return ( dist - near ) / ( far - near );
}
float vectorLinearObjectSpaceDepth(vec3 direction, vec3 origin, float near, float far) {
    vec3 n = normalize(direction);
    float dist = (n.x*(vPosition.x - origin.x) + n.y*(vPosition.y - origin.y) + n.z*(vPosition.z - origin.z));
    return ( dist - near ) / ( far - near );
}
float vectorSphericalObjectSpaceDepth(vec3 origin, float near, float far) {
    float dist = length(vPosition - origin);
    return ( dist - near ) / ( far - near );
}
float vectorSphericalWorldSpaceDepth(vec3 origin, float near, float far) {
    float dist = length(vWPosition - origin);
    return ( dist - near ) / ( far - near );
}
vec3 fresnel(vec3 color, float bias, float scale, float intensity, float factor, bool isMask, float mask, float alpha, int mode, out float calpha) {
    float fresnel = bias + scale * pow( abs( factor + dot( normalize( vWorldViewDir ), normalize( vWNormal ) ) ), intensity );
    float lalpha = clamp(fresnel, 0.0, 1.0) * alpha * mask;
    calpha = mix(lalpha / clamp(lalpha + accumAlpha, 0.00001, 1.0), lalpha, float(isMask));
    accumAlpha += (1.0 - accumAlpha) * lalpha * (1.0 - float(isMask));
    return color;
}
vec3 getTransmissionSample( vec2 fragCoord, float roughness, float ior, vec2 transmissionSamplerSize, sampler2D transmissionSamplerMap, sampler2D transmissionDepthMap, vec2 unrefractedCoords, vec2 aspectRatio) {
    float lod = log2(transmissionSamplerSize.x) * applyIorToRoughness(roughness / 5.0, ior);
    return textureBicubic(transmissionSamplerMap, fragCoord.xy, lod).rgb;
}
vec3 g8d7e9b0fc16b4c34a47adb69357bbbc6_sdepth(float near, float far, vec3 origin, vec3 direction, vec4 colors[4], float steps[4], bool isMask, float mask, float alpha, out float calpha) {
    vec4 color = colors[0];
    float depth = vectorSphericalObjectSpaceDepth(origin, near, far);
    float p;
    for ( int i = 1; i < 4; i++ ) {
        p = clamp(( depth - steps[i - 1] ) / ( steps[i] - steps[i - 1] ), 0.0, 1.0);
        color = mix(color, colors[i], p);
    }
    float lalpha = alpha * color.a * mask;
    calpha = mix(lalpha / clamp(lalpha + accumAlpha, 0.00001, 1.0), lalpha, float(isMask));
    accumAlpha += (1.0 - accumAlpha) * lalpha * (1.0 - float(isMask));
    return color.rgb;
}
vec3 getIBLVolumeRefraction( vec3 n, vec3 v, float roughness, vec3 position, mat4 modelMatrix, mat4 viewMatrix, mat4 projMatrix, float ior, float thickness, vec2 transmissionSamplerSize, sampler2D transmissionSamplerMap, sampler2D transmissionDepthMap, vec2 aspectRatio ) {
    vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
    vec3 refractedRayExit = position + transmissionRay;
    vec4 ndcPos = projMatrix * viewMatrix *  vec4( refractedRayExit, 1.0 );
    vec2 refractionCoords = ndcPos.xy / ndcPos.w;
    refractionCoords += 1.0;
    refractionCoords /= 2.0;
    vec4 ndcPosUnrefracted = projMatrix * viewMatrix * vec4(position, 1.0 );
    vec2 unrefractedCoords = ndcPosUnrefracted.xy / ndcPosUnrefracted.w;
    unrefractedCoords += 1.0;
    unrefractedCoords /= 2.0;
    return getTransmissionSample( refractionCoords, roughness, ior, transmissionSamplerSize, transmissionSamplerMap, transmissionDepthMap, unrefractedCoords, aspectRatio );
}
vec3 transmission(float thickness, float ior, float roughness, vec2 transmissionSamplerSize, sampler2D transmissionSamplerMap, sampler2D transmissionDepthMap, vec2 aspectRatio, vec3 normal, float mask, float alpha, out float calpha) {
    vec3 v = vec3(0.);
    if (isOrthographic) {
        v = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
    }
    else {
        v = normalize(vWPosition - cameraPosition);
    }
    vec3 transmission = getIBLVolumeRefraction(vWNormal, -v, roughness, vWPosition, modelMatrix, viewMatrix, projectionMatrix, ior, thickness, transmissionSamplerSize, transmissionSamplerMap, transmissionDepthMap, aspectRatio );
    float lalpha = alpha * mask;
    calpha = lalpha / clamp( lalpha + accumAlpha, 0.00001, 1.0 );
    accumAlpha += ( 1.0 - accumAlpha ) * alpha;
    return transmission;
}
void main() {
    float g2d41ad11a64d433381d52c837f58aaf0_calpha;
    float g8d7e9b0fc16b4c34a47adb69357bbbc6_calpha;
    float gc6c50dd4328e44238c6a71f1a10eb583_calpha;
    float g16f01a11643f44efa551b80c406b3e43_calpha;
    float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
    vec3 normal = normalize( vNormal );
    vec3 geometryNormal = normal;
    vec3 viewdx = dFdx(vViewPosition);
    vec3 viewdy = dFdy(vViewPosition);
    vec3 faceNormal = normalize(cross(viewdx, viewdy));
    if (dot(normal, faceNormal) < 0.0) {
        normal *= -1.0;
    }
    PhysicalMaterial material;
    material.diffuseColor = vec3( 1.0 );
    vec3 diffuseColor = spe_blend(spe_blend(spe_blend(transmission(nodeU0, nodeU1, nodeU2, nodeU3, nodeU4, nodeU5, nodeU6, normal, 1.0, nodeU7, g2d41ad11a64d433381d52c837f58aaf0_calpha), g8d7e9b0fc16b4c34a47adb69357bbbc6_sdepth(nodeU8, nodeU9, nodeU10, nodeU11, nodeUA0, nodeUA1, nodeU12, 1.0, nodeU13, g8d7e9b0fc16b4c34a47adb69357bbbc6_calpha), ( g8d7e9b0fc16b4c34a47adb69357bbbc6_calpha ), nodeU14), fresnel(nodeU15, nodeU16, nodeU17, nodeU18, nodeU19, nodeU20, 1.0, nodeU21, nodeU22, gc6c50dd4328e44238c6a71f1a10eb583_calpha), ( gc6c50dd4328e44238c6a71f1a10eb583_calpha ), nodeU22), fresnel(nodeU23, nodeU24, nodeU25, nodeU26, nodeU27, nodeU28, 1.0, nodeU29, nodeU30, g16f01a11643f44efa551b80c406b3e43_calpha), ( g16f01a11643f44efa551b80c406b3e43_calpha ), nodeU30);
    ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
    float metalnessFactor = nodeU32;
    float roughnessFactor = nodeU31;
    vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
    float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
    material.diffuseColor = diffuseColor * ( 1.0 - metalnessFactor );
    material.roughness = max( roughnessFactor, 0.0525 );
    material.roughness += geometryRoughness;
    material.roughness = min( material.roughness, 1.0 );
    material.roughness = clamp( roughnessFactor, 0.04, 1.0 );
    material.specularColor = mix( vec3( 0.16 * pow2( nodeU37 ) ), diffuseColor, metalnessFactor );
    GeometricContext geometry;
    geometry.position = - vViewPosition;
    geometry.normal = normal;
    geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
    IncidentLight directLight;
    DirectionalLight directionalLight;
    directionalLight = directionalLights[ 0 ];
    getDirectionalLightInfo( directionalLight, geometry, directLight );
    RE_Direct_Physical( directLight, geometry, material, reflectedLight );
    vec3 iblIrradiance = vec3( 0.0 );
    vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
    irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
    irradiance += getHemisphereLightIrradiance( hemisphereLights[ 0 ], geometry.normal );
    vec3 radiance = vec3( 0.0 );
    vec3 clearcoatRadiance = vec3( 0.0 );
    RE_IndirectDiffuse_Physical( irradiance, geometry, material, reflectedLight );
    RE_IndirectSpecular_Physical( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
    vec3 ao = aoEnabled && nodeU33 ? texture(aoMap, gl_FragCoord.xy / resolution).rgb : vec3(1.0);
    vec3 outgoingLight = ((reflectedLight.directDiffuse + reflectedLight.indirectDiffuse)) + reflectedLight.directSpecular + reflectedLight.indirectSpecular;
    if (outgoingLight != diffuseColor) {
        float lightAccu = clamp( length( reflectedLight.directSpecular + reflectedLight.indirectSpecular ), 0.0, 1.0 );
        accumAlpha += ( 1.0 - accumAlpha ) * nodeU34 * 1.0 * lightAccu;
        outgoingLight = spe_blend( diffuseColor, outgoingLight, nodeU34 * 1.0, nodeU35 );
        outgoingLight *= ao;
    }
    gl_FragColor = vec4( outgoingLight, accumAlpha * nodeU36 );
    gl_FragColor.a *= nodeU38;
    gl_FragColor = linearToOutputTexel( gl_FragColor );
    gl_FragColor.rgb = dithering( gl_FragColor.rgb );
}

`
