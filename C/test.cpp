#include <windows.h>
#include <GL/gl.h>
#include <GL/glu.h>

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);

// Khởi tạo OpenGL
void InitOpenGL(HWND hwnd) {
    PIXELFORMATDESCRIPTOR pfd;
    int nPixelFormat;

    // Khởi tạo pixel format descriptor
    ZeroMemory(&pfd, sizeof(pfd));
    pfd.nSize = sizeof(pfd);
    pfd.nVersion = 1;
    pfd.dwFlags = PFD_DRAW_TO_WINDOW | PFD_SUPPORT_OPENGL | PFD_DOUBLEBUFFER;
    pfd.iPixelType = PFD_TYPE_RGBA;
    pfd.cColorBits = 32;
    pfd.cRedBits = 8;
    pfd.cGreenBits = 8;
    pfd.cBlueBits = 8;
    pfd.cAlphaBits = 8;

    // Lấy pixel format hợp lệ
    HDC hdc = GetDC(hwnd);
    nPixelFormat = ChoosePixelFormat(hdc, &pfd);
    SetPixelFormat(hdc, nPixelFormat, &pfd);

    // Tạo rendering context cho OpenGL
    HGLRC hglrc = wglCreateContext(hdc);
    wglMakeCurrent(hdc, hglrc);
}

// Vẽ tam giác OpenGL
void DrawScene() {
    glClear(GL_COLOR_BUFFER_BIT); // Xóa màn hình
    glLoadIdentity();             // Đặt lại ma trận

    // Vẽ tam giác
    glBegin(GL_TRIANGLES);
        glColor3f(1.0, 0.0, 0.0); glVertex2f(-0.1f, -0.1f); // Đỉnh trái dưới, màu đỏ
        glColor3f(0.0, 1.0, 0.0); glVertex2f( 0.5f, -0.5f); // Đỉnh phải dưới, màu xanh lá
        glColor3f(0.0, 0.0, 1.0); glVertex2f( 0.0f,  0.5f); // Đỉnh trên, màu xanh dương
    glEnd();

    SwapBuffers(GetDC(GetActiveWindow())); // Hoán đổi bộ đệm
}

// Tạo cửa sổ Windows
HWND CreateOpenGLWindow(HINSTANCE hInstance, int nCmdShow) {
    WNDCLASSEX wc;
    HWND hwnd;
    MSG msg;

    ZeroMemory(&wc, sizeof(wc));
    wc.cbSize = sizeof(wc);
    wc.lpfnWndProc = WndProc; // Hàm xử lý sự kiện
    wc.hInstance = hInstance;
    wc.lpszClassName = "OpenGLWindowClass";
    wc.style = CS_OWNDC;

    RegisterClassEx(&wc);

    hwnd = CreateWindowEx(0, wc.lpszClassName, "OpenGL Window", WS_OVERLAPPEDWINDOW,
                          CW_USEDEFAULT, CW_USEDEFAULT, 800, 600, nullptr, nullptr, hInstance, nullptr);

    ShowWindow(hwnd, nCmdShow);
    UpdateWindow(hwnd);
    return hwnd;
}

// Hàm xử lý các sự kiện trong cửa sổ
LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, WPARAM wp, LPARAM lp) {
    switch(msg) {
        case WM_DESTROY:
            PostQuitMessage(0);
            return 0;
        case WM_KEYDOWN:
            if (wp == VK_ESCAPE) {
                PostQuitMessage(0);
            }
            return 0;
    }

    return DefWindowProc(hwnd, msg, wp, lp);
}

int main() {
    HINSTANCE hInstance = GetModuleHandle(nullptr);
    HWND hwnd = CreateOpenGLWindow(hInstance, SW_SHOWNORMAL);

    // Khởi tạo OpenGL
    InitOpenGL(hwnd);

    // Vòng lặp chính xử lý sự kiện
    MSG msg;
    while (true) {
        if (PeekMessage(&msg, nullptr, 0, 0, PM_REMOVE)) {
            if (msg.message == WM_QUIT) {
                break;
            }
            TranslateMessage(&msg);
            DispatchMessage(&msg);
        }

        // Vẽ scene
        DrawScene();
    }

    return 0;
}
