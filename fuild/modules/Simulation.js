import Mouse from "./Mouse.js";
import Common from "./Common.js";
import * as THREE from "three";


import Advection from "./Advection.js";
import ExternalForce from "./ExternalForce.js";
import Viscous from "./Viscous.js";
import Divergence from "./Divergence.js";
import Poisson from "./Poisson.js";
import Pressure from "./Pressure.js";

export default class Simulation{
    constructor(props){
        this.props = props;
       
        this.fbos = {
            vel_0: null,
            vel_1: null,

            // for calc next velocity with viscous
            // vel_viscous0: null,
            // vel_viscous1: null,

            // for calc pressure
            div: null,

            // for calc poisson equation 
            pressure_0: null,
            pressure_1: null,
        };

        this.options = {
            iterations_poisson: 1,
            iterations_viscous: 32,
            mouse_force: 150,
            resolution: 0.5 ,
            cursor_size: 40,
            viscous: 30,
            isBounce: false,
            dt: 0.024,
            isViscous: false,
            BFECC: false
        };

        // const controls = new Controls(this.options);

        this.fboSize = new THREE.Vector2();
        this.cellScale = new THREE.Vector2();
        this.boundarySpace = new THREE.Vector2();


        this.group = new THREE.Group();
        this.group.name = "monitor"

        this.init();
    }

    
    init(){
        this.calcSize();
        this.createAllFBO();
        this.createShaderPass();
        this.initPlane()
    }

    createAllFBO(){
        const type = ( /(iPad|iPhone|iPod)/g.test( navigator.userAgent ) ) ? THREE.HalfFloatType : THREE.FloatType;

        for(let key in this.fbos){
            this.fbos[key] = new THREE.WebGLRenderTarget(
                this.fboSize.x,
                this.fboSize.y,
                {
                    type: type
                }
            )

        }
    }
    initPlane(){
        let cc = 0
     
        // for(let key in this.fbos){
        //     cc++
        //     const  g = new THREE.PlaneGeometry(2,2);
        //     const m = new THREE.ShaderMaterial({
        //         vertexShader: `
        //         varying vec2 vUv;
        //             void main() {
        //                 gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        //                 vUv = uv;
        //             }
        //         `,
        //         fragmentShader: `
        //         varying vec2 vUv;
        //             uniform sampler2D uTexture${key};
        //             void main() {  
        //                 gl_FragColor = texture2D(uTexture${key}, vUv)  * vec4(1.,0.,0.,1.);
        //                 // gl_FragColor = vec4(1.,0.,0.,1.);
        //             }
        //         `,
        //         uniforms :{
        //             [`uTexture${key}`] : {
        //                 value: null
        //             }
        //         },
        //         // wireframe: true
        //     })
        //     const mesh = new THREE.Mesh(g,m);
        //     mesh.position.x = cc  + 2.5 - 7.

        //     this.group.add(mesh);
            
        //     this.props.add( this.group);
          
        // }
     
    }
    createShaderPass(){
        this.advection = new Advection({
            cellScale: this.cellScale,
            fboSize: this.fboSize,
            dt: this.options.dt,
            src: this.fbos.vel_0,
            dst: this.fbos.vel_1
        });

        this.externalForce = new ExternalForce({
            cellScale: this.cellScale,
            cursor_size: this.options.cursor_size,
            dst: this.fbos.vel_1,
        });

        // this.viscous = new Viscous({
        //     cellScale: this.cellScale,
        //     boundarySpace: this.boundarySpace,
        //     viscous: this.options.viscous,
        //     src: this.fbos.vel_1,
        //     dst: this.fbos.vel_viscous1,
        //     dst_: this.fbos.vel_viscous0,
        //     dt: this.options.dt,
        // });

        this.divergence = new Divergence({
            cellScale: this.cellScale,
            boundarySpace: this.boundarySpace,
            // src: this.fbos.vel_viscous0,
            src: this.fbos.vel_0,
            dst: this.fbos.div,
            dt: this.options.dt,
        });

        this.poisson = new Poisson({
            cellScale: this.cellScale,
            boundarySpace: this.boundarySpace,
            src: this.fbos.div,
            dst: this.fbos.pressure_1,
            dst_: this.fbos.pressure_0,
        });

        this.pressure = new Pressure({
            cellScale: this.cellScale,
            boundarySpace: this.boundarySpace,
            src_p: this.fbos.pressure_0,
            // src_v: this.fbos.vel_viscous0,
            src_v: this.fbos.vel_0,
            dst: this.fbos.vel_0,
            dt: this.options.dt,
        });
    }

    calcSize(){
        const width = Math.round(this.options.resolution * Common.width);
        const height = Math.round(this.options.resolution * Common.height);

        const px_x = 1.0 / width;
        const px_y = 1.0 / height;

        this.cellScale.set(px_x, px_y);
        console.log( this.cellScale)
        this.fboSize.set(width, height);
    }

    resize(){
        this.calcSize();

        for(let key in this.fbos){
            this.fbos[key].setSize(this.fboSize.x, this.fboSize.y);
        }
    }


    update(){

        if(this.options.isBounce){
            this.boundarySpace.set(0, 0);
        } else {
            this.boundarySpace.copy(this.cellScale);
        }



        this.advection.update(this.options);

        this.externalForce.update({
            cursor_size: this.options.cursor_size,
            mouse_force: this.options.mouse_force,
            cellScale: this.cellScale
        });

        let vel = this.fbos.vel_1;

        // if(this.options.isViscous){
        //     vel = this.viscous.update({
        //         viscous: this.options.viscous,
        //         iterations: this.options.iterations_viscous,
        //         dt: this.options.dt
        //     });
        // }

        this.divergence.update({vel});

        const pressure = this.poisson.update({
            iterations: this.options.iterations_poisson,
        });

        this.pressure.update({ vel , pressure});

      
    }
}