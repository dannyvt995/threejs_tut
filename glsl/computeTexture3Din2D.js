export const computeTexture3Din2D = `
            vec2 computeSliceOffset(float slice, vec4 sliceInfo) {
				return sliceInfo.zw * vec2(mod(slice, sliceInfo.y), floor(slice * sliceInfo.z));
			}
			
			vec4 sampleAs3DTexture(sampler2D tex, vec3 texCoord, vec4 sliceInfo) {
			
				float slice = texCoord.z * sliceInfo.x;
				float sliceZ = floor(slice);
	
				vec2 slice0Offset = computeSliceOffset(sliceZ, sliceInfo);
				vec2 slice1Offset = computeSliceOffset(sliceZ + 1.0, sliceInfo);
			
				vec2 slicePixelSize = sliceInfo.zw / sliceInfo.x;
			
				vec2 uv = slicePixelSize * 0.5 + texCoord.xy * (sliceInfo.zw - slicePixelSize);
				vec4 slice0Color = texture2D(tex, slice0Offset + uv);
				vec4 slice1Color = texture2D(tex, slice1Offset + uv);
				return mix(slice0Color, slice1Color, fract(slice));
			}
`