import Renderer from "./Renderer.js";
import * as THREE from "three";

import Simulation from "./Simulation.js";
import { faceVert } from "./glsl/sim/faceVert.js";
import { colorFrag } from "./glsl/sim/colorFrag.js";
import { OrbitControls } from 'three/addons/OrbitControls.js';

export default class Output {
    constructor(props) {
        this.props = props;
        this.outMat = null
        this.init();
    }

    init() {


        this.scene = new THREE.Scene();
        this.scene.background = 0x000000
        const light = new THREE.AmbientLight(0x404040); // soft white light
        this.scene.add(light);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
        this.scene.add(directionalLight);

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 1
   
        // Tính chiều cao của plane sao cho khớp với viewport
        const fov = this.camera.fov * (Math.PI / 180); // Đổi fov từ độ sang radian
        const distance = this.camera.position.z; // Khoảng cách từ camera đến plane
        const height = 2 * Math.tan(fov / 2) * distance;
        
        // Tính chiều rộng dựa trên tỉ lệ của viewport
        const aspect = window.innerWidth / window.innerHeight;
        const width = height * aspect;
        
        this.textureImg = new THREE.TextureLoader().load('textures/cat.jpg');
      //  this.controls = new OrbitControls(this.camera, Renderer.renderer.domElement);
        this.simulation = new Simulation(this.scene);
        this.outMat = new THREE.ShaderMaterial({
            vertexShader: `
             
                uniform vec2 px;
                uniform vec2 boundarySpace;
                varying vec2 vUv;

                precision highp float;

                void main(){
                    vec3 pos = position;
                    vec2 scale = 1.0 - boundarySpace * 2.0;
                    pos.xy = pos.xy * scale;
                    vUv = vec2(0.5)+(pos.xy)*0.5;
           
                    gl_Position =vec4(position , 1.0);
                }
                 
               
            `,
            fragmentShader: colorFrag,
            uniforms: {
                time: {
                    value: 0
                },
                velocity: {
                    value: this.simulation.fbos.vel_0.texture
                },
                div: {
                    value: this.simulation.fbos.div.texture
                },
                pressure: {
                    value: this.simulation.fbos.pressure_1.texture
                },
                textureImg: {
                    value: this.textureImg
                },
                boundarySpace: {
                    value: new THREE.Vector2()
                }
            },
            wireframe: false,
            transparent: true,
            blending: THREE.AdditiveBlending
        })

        this.outViewMatnew = new THREE.ShaderMaterial({
            vertexShader: `
                varying vec2 vUv;

                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec2 vUv;
                uniform sampler2D velocity;
                uniform sampler2D div;
                uniform sampler2D pressure;
                uniform sampler2D textureImg;
                vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
                {
                    return a + b*cos( 6.28318*(c*t+d) );
                }

                void main() {
                    vec2 vel = texture2D(velocity, vUv).xy;
   
                    vec2 pre = texture2D(pressure, vUv).xy;
                    vec3 image = texture2D(textureImg, (vel + vec2(.5))).xyz;

                    float len = length(vel);
                    vel = vel * 0.5 + 0.5;
                    
                


                    vec3  col = pal( pre.y , vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.33,0.67) );

                    vec3  colBase = pal(atan(vUv.y,vUv.x) , vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,0.5),vec3(0.8,0.90,0.30) );
                    vec3  colVel = pal( atan(vel.y,vel.x) , vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,0.5),vec3(0.8,0.90,0.30) );


                    vec3 color = vec3(vel.x, vel.y, 1.0);
                    color = mix(vec3(1.0), mix(colVel,colBase,.5), len);

                        
                    gl_FragColor = vec4(1.- color , 1.); // good
                }
            `,
            uniforms: {
                time: {
                    value: 0
                },
                velocity: {
                    value: this.simulation.fbos.vel_0.texture
                },
                div: {
                    value: this.simulation.fbos.div.texture
                },
                pressure: {
                    value: this.simulation.fbos.pressure_1.texture
                },
                textureImg: {
                    value: this.textureImg
                },
                boundarySpace: {
                    value: new THREE.Vector2()
                }
            },
            wireframe: false,
            transparent: true,
            blending: THREE.AdditiveBlending
        })

        this.viewOut = new THREE.Mesh(
            new THREE.PlaneGeometry(width, height),
            this.outViewMatnew
        );
        this.output = new THREE.Mesh(
            new THREE.PlaneGeometry(2, 2),
            this.outMat
        );
    

        this.output.position.z = 0
    //   this.scene.add(this.viewOut);














       const gridSize = 256; 
       const spacing = 1.0 / (gridSize - 1); 
       
       
       const vertices = [];
       const uvs = [];
       
       for (let x = 0; x < gridSize; x++) {
           for (let y = 0; y < gridSize; y++) {
               const u = x * spacing;
               const v = y * spacing;
       
               // Randomize vị trí của hạt trong khoảng từ 0 đến width và height
               let posX = (Math.random() - 0.5) * width;
               let posY = (Math.random() - 0.5) * height;
               
               // Thêm các tọa độ vị trí vào mảng vertices
               vertices.push(posX, posY, 0);  // Đặt z = 0 để các hạt nằm trên mặt phẳng
               
               // Thêm uvs để lưu trữ tọa độ texture
               uvs.push(u, v);
           }
       }

       
        const PointGeo = new THREE.BufferGeometry();
        const positionAttribute = new THREE.BufferAttribute(new Float32Array(vertices), 3);
 
        const uvAttribute = new THREE.BufferAttribute(new Float32Array(uvs), 2);
        PointGeo.setAttribute('position', positionAttribute);
        PointGeo.setAttribute('uv', uvAttribute);


        const vertexShader = `
                precision highp float;
                uniform float time;
                uniform sampler2D fuildMap;
                uniform vec2 sizeView;
                varying vec2 vUv;
                varying vec3 vPos;
     
                void main() {
                     vec2 uvPos = vec2(
                         position.x / sizeView.x + 0.5,
                        position.y / sizeView.y + 0.5
                     );
                     vec2 vel = texture2D(fuildMap,uvPos).xy;
                     vec3 pos = position;
                    
                     pos.xy += vel  ;
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                  
                    vUv = uvPos;
                    vPos = pos;
                    gl_PointSize  = 2.;
                }
            `;

        const fragmentShader = `
                varying vec3 vPos;
                    varying vec2 vUv;
                 uniform sampler2D fuildMap;
                    uniform sampler2D fuildPress;
                    vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
                {
                    return a + b*cos( 6.28318*(c*t+d) );
                }

                void main() {
                    vec2 vel = texture2D(fuildMap,vUv).xy;
                           vec2 press = texture2D(fuildPress,vUv).xy;
                  float len = length(vel);
                    vec2 velO = vel * 0.5 + 0.5;
                    vec3  colVel = pal((vel.y+vel.x) * 4.2, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,0.5),vec3(0.8,0.90,0.30) );
                    vec3  colPress = pal((press.y+press.x) * 4.2, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.33,0.67));
                    gl_FragColor = vec4(colVel,.5);
                }
            `

        this.pointMat = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true,
            depthWrite: false,
            blendSrcAlpha: 1,
            uniforms: {
                time: {
                    value: 0
                },
                fuildMap: {
                    value: this.simulation.fbos.vel_0.texture
                },
                fuildPress: {
                    value: this.simulation.fbos.pressure_0.texture
                },
                sizeView : {
                    value: new THREE.Vector2(width,height)
                }
            }
        });


        let points = new THREE.Points(PointGeo,  this.pointMat);


        this.scene.add(points)

    }
    addScene(mesh) {
        this.scene.add(mesh);
    }

    resize() {
        this.simulation.resize();
    }

    render() {
       
        Renderer.renderer.setRenderTarget(null);
        Renderer.renderer.render(this.scene, this.camera);
    }

    update() {
      
        this.outMat.uniforms.time.value = Renderer.time
        this.simulation.update();
        this.render();
    }
}