export const calcSizeFitCamPerspective = (camera) => {
    
    // Tính chiều cao của plane sao cho khớp với viewport
    const fov = camera.fov * (Math.PI / 180); // Đổi fov từ độ sang radian
    const distance = camera.position.z; // Khoảng cách từ camera đến plane
    const heightFit = 2 * Math.tan(fov / 2) * distance;

    // Tính chiều rộng dựa trên tỉ lệ của viewport
    const aspect = window.innerWidth / window.innerHeight;
    const widthFit = heightFit * aspect;
    return [widthFit,heightFit]
}