const save = `
precision mediump sampler2DArray;
precision highp float;
precision highp int;
uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;
uniform vec3 cameraPosition;
uniform bool isOrthographic;
in vec3 position;
in vec3 normal;
in vec2 uv;
uniform vec3 u_position;
uniform vec4 u_quaternion;
uniform vec3 u_scale;
uniform vec2 u_domXYFrom;
uniform vec2 u_domWHFrom;
uniform vec2 u_domXY;
uniform vec2 u_domWH;
uniform vec2 u_domPivot;
uniform vec4 u_domPadding;
uniform float u_showRatio;
out vec2 v_uv;
out vec2 v_domWH;
out float v_showRatio;
out float v_deltaRatio;
vec3 qrotate(vec4 q, vec3 v) {
    return v+2.*cross(q.xyz, cross(q.xyz, v)+q.w*v);
}
vec3 getBasePosition(in vec3 pos, in vec2 domWH) {
    vec3 basePos = vec3((pos.xy)*domWH-u_domPivot, pos.z);
    basePos.xy += mix(-u_domPadding.xz, u_domPadding.yw, pos.xy);
    return basePos;
}
float linearStep(float edge0, float edge1, float x) {
    return clamp((x-edge0)/(edge1-edge0), 0.0, 1.0);
}
vec3 getScreenPosition(in vec3 basePos, in vec2 domXY) {
    vec3 screenPos = qrotate(u_quaternion, basePos*u_scale)+vec3(u_domPivot.xy, 0.);
    screenPos = (screenPos+vec3(domXY, 0.)+u_position)*vec3(1., -1., 1.);
    return screenPos;
}
float cubicBezier(float p0, float p1, float p2, float p3, float t) {
    float c = (p1-p0)*3.;
    float b = (p2-p1)*3.-c;
    float a = p3-p0-c-b;
    float t2 = t*t;
    float t3 = t2*t;
    return a*t3+b*t2+c*t+p0;
}
float easeOutBack(float t) {
    return cubicBezier(0., 1.3, 1.1, 1., t);
}
void main() {
    float placementWeight = 1.-(pow(position.x*position.x, 0.75)+pow(1.-position.y, 1.5))/2.;
    v_showRatio = (smoothstep(placementWeight*0.3, 0.7+placementWeight*0.3, u_showRatio));
    vec2 domXY = mix(u_domXYFrom, u_domXY, v_showRatio);
    vec2 domWH = mix(u_domWHFrom, u_domWH, v_showRatio);
    domXY.x += mix(domWH.x, 0., cos(v_showRatio*3.1415926*2.)*0.5+0.5)*0.1;
    vec3 basePos = getBasePosition(position, domWH);
    float rot = (smoothstep(0., 1., v_showRatio)-v_showRatio)*-0.5;
    vec3 rotBasePos = qrotate(vec4(0., 0., sin(rot), cos(rot)), basePos);
    vec3 screenPos = getScreenPosition(rotBasePos, domXY);
    gl_Position = projectionMatrix*modelViewMatrix*vec4(screenPos, 1.0);
    v_uv = vec2(uv.x, 1.-uv.y);
    v_domWH = domWH;
}

`