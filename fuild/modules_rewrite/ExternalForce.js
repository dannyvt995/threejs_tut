import {mouseVert} from "./glsl/sim/mouseVert.js";
import {externalForceFrag} from "./glsl/sim/externalForceFrag.js";
import ShaderPass from "./ShaderPass.js";
import Mouse from "./Mouse.js";

import * as THREE from "three";
import Renderer from "./Renderer.js";

export default class ExternalForce extends ShaderPass{
    constructor(simProps){
        super({
            output: simProps.dst,
            material:{
                name:"ExternalForce",
            }
        });
        this.force = new THREE.Vector2()
        this.forcePrev = new THREE.Vector2()
        this.center = new THREE.Vector2()
        this.lastMouseCoords = { x: Mouse.coords.x, y: Mouse.coords.y };
        this.speedFactor = 1;
        this.speed = 0.
        this.force2 = 0 
        this.pointerCurrent = new THREE.Vector2()
        this.pointerPrev = new THREE.Vector2()

        this.init(simProps);
    }

    init(simProps){
        super.init();
        const mouseG = new THREE.PlaneGeometry(
            1, 1
        );

        const width = window.innerWidth
        const height = window.innerHeight

        const mouseM = new THREE.RawShaderMaterial({
            name:"ExternalForce",
            vertexShader: mouseVert,
            fragmentShader: externalForceFrag,
            blending: THREE.AdditiveBlending,
            uniforms: {
                time:{
                    value:0
                },
                px: {
                    value: simProps.cellScale
                },
                force: {
                    value: new THREE.Vector2(0.0, 0.0)
                },
                center: {
                    value: new THREE.Vector2(0.0, 0.0)
                },
                scale: {
                    value: new THREE.Vector2(simProps.cursor_size, simProps.cursor_size)
                },


                resolution: { value : new THREE.Vector4(width,height,1,1)},
                u_drawTo : { value: new THREE.Vector4(0,0,0,1) },
                u_drawFrom : { value: new THREE.Vector4(0,0,0,1) },
            },
        })

        this.mouse = new THREE.Mesh(mouseG, mouseM);
        this.scene.add(this.mouse);
    }

    update(props){
        const forceX = Mouse.diff.x / 2 * props.mouse_force;
        const forceY = Mouse.diff.y / 2 * props.mouse_force;
 
        const cursorSizeX = props.cursor_size * props.cellScale.x;
        const cursorSizeY = props.cursor_size * props.cellScale.y;

        const centerX = Math.min(Math.max(Mouse.coords.x, -1 + cursorSizeX + props.cellScale.x * 2), 1 - cursorSizeX - props.cellScale.x * 2);
        const centerY = Math.min(Math.max(Mouse.coords.y, -1 + cursorSizeY + props.cellScale.y * 2), 1 - cursorSizeY - props.cellScale.y * 2);

        const uniforms = this.mouse.material.uniforms;

        this.force.set(forceX,forceY)

        this.forcePrev.lerp(this.force , 0.072);
       // console.log(  this.forcePrev)
       // console.log( this.force.x, this.force.y)
        this.center.set(centerX,centerY)
        uniforms.force.value.set(this.forcePrev.x, this.forcePrev.y);
        uniforms.center.value.set(centerX, centerY);
       
      
        // Tính toán tốc độ di chuyển chuột
        const deltaX = Mouse.coords.x - this.lastMouseCoords.x;
        const deltaY = Mouse.coords.y - this.lastMouseCoords.y;
        let speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY) * 30;
       this.speed = speed
        let sizeOut = 0
        if(props.cursor_size * speed > 70) {
            sizeOut = 50
        }else if(props.cursor_size * speed < 20) {
            sizeOut = 10
        }else{
            sizeOut = props.cursor_size * speed
        }
         //uniforms.scale.value.set(sizeOut,sizeOut);
       uniforms.scale.value.set(props.cursor_size ,props.cursor_size );
        uniforms.time.value = Renderer.time

        this.lastMouseCoords = { x: Mouse.coords.x, y: Mouse.coords.y };
        


        this.pointerCurrent.set(Mouse.pointMode2.x,Mouse.pointMode2.y);
        this.pointerPrev.lerp(this.pointerCurrent, 0.036);
        this.force2 = this.pointerCurrent.distanceTo(this.pointerPrev) * .05;

        uniforms.u_drawTo.value = new THREE.Vector4(this.pointerCurrent.x,this.pointerCurrent.y,0,1)
        uniforms.u_drawFrom.value = new THREE.Vector4(this.pointerPrev.x,this.pointerPrev.y,0,1)
 

        super.update();
    }

}