export const getDisFromDepth = `
float getDistToCamera(mat4 shadowMatrix, sampler2D texture, vec3 position, mat4 invertProj, mat4 invertView, sampler2D textureDepth, inout float outside, inout vec3 normal) {
	vec4 vShadowCoord = shadowMatrix * vec4(position, 1.0);
	vec4 shadowCoord  = vShadowCoord / vShadowCoord.w;
	vec2 uvS = shadowCoord.xy;
	vec4 color = texture2D(texture, uvS);
	if(color.a <= 0.0) {
		outside = 0.7;
	}
	float depth = texture2D(textureDepth, uvS).r;
	float z = depth * 2.0 - 1.0;

	vec4 clipSpacePosition = vec4(uvS * 2.0 - 1.0, z, 1.0);
    vec4 viewSpacePosition = invertProj * clipSpacePosition;
    viewSpacePosition /= viewSpacePosition.w;

    vec4 worldSpacePosition = invertView * viewSpacePosition;

    normal = color.rgb * 2.0 - 1.0;

    return worldSpacePosition.z;
}
`