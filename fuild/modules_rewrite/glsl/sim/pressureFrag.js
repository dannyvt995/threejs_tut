
export  const   pressureFrag = `
precision highp float;
uniform sampler2D pressure;
uniform sampler2D velocity;
uniform vec2 px;
uniform float dt;
varying vec2 uv;

void main(){
    float step = 1.0;

    float p0 = texture2D(pressure, uv+vec2(px.x * step, 0)).r;
    float p1 = texture2D(pressure, uv-vec2(px.x * step, 0)).r;
    float p2 = texture2D(pressure, uv+vec2(0, px.y * step)).r;
    float p3 = texture2D(pressure, uv-vec2(0, px.y * step)).r;

vec2 v = texture2D(velocity, uv).xy;
vec2 gradP = vec2(p0 - p1, p2 - p3) * 1.0; // Tăng hệ số từ 0.8 lên 1.0

// Áp dụng một hệ số giảm nhẹ để làm mịn chuyển động
float smoothingFactor = 0.85; // Tăng từ 0.75 lên 0.85
v = mix(v, v - gradP * dt, smoothingFactor);

// Áp dụng một ngưỡng để giảm thiểu các gợn nhỏ
float threshold = 0.005; // Giảm từ 0.01 xuống 0.005
v = (length(v) < threshold) ? vec2(0.0) : v;

// Giới hạn tốc độ tối đa để tránh tụ màu quá mức
float maxSpeed = 1.2; // Tăng từ 1.0 lên 1.2
v = clamp(v, -maxSpeed, maxSpeed);


  
 vec2 v2 = texture2D(velocity, uv).xy;
    vec2 gradP2 = vec2(p0 - p1, p2 - p3) * 0.5;
    v2 =  v2 - gradP2 * dt;
    
    // Gán màu cho fragment
    gl_FragColor = vec4(v2, 0.0, 1.0);
}

`