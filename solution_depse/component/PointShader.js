import * as THREE from 'three';
import { vertexInstanceBuddle,fragmentInstanceBuddle } from './glsl/bgparticel.js';
export class PointShader {
    constructor(parameters) {
        this.parameters = parameters;
        this.count = this.parameters.count;
        this.scene = this.parameters.scene;
        this.camera = this.parameters.camera;
        this.renderer = this.parameters.renderer;

        this.geometry = new THREE.BufferGeometry();
        this.material = this.createShaderMaterial();
        this.points = new THREE.Points(this.geometry, this.material);

        this.scene.add(this.points);

        this.randomAttribute = this.createRandomAttribute();
        this.propsSizeAttribute = this.createSizeAttribute();
        this.propsMutilAttribute = this.createMutilAttribute();

        this.positionTexture = this.createPositionTexture();
        this.velocityTexture = this.createVelocityTexture();

        this.createAttributes();
    }

    createShaderMaterial() {
        const vertexShader = vertexInstanceBuddle
        const fragmentShader = fragmentInstanceBuddle;

        return new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uPositionTexture: { value: this.positionTexture },
                uVelocityTexture: { value: this.velocityTexture },
                uTime: {
                    value: 0.0,
                },
                uScroll: {
                    value: 0,
                },
                uDiffScroll: {
                    value: 0,
                },
                uMouse: {
                    value: new THREE.Vector2(0, 0),
                },
                propsDomMap: {
                    value: new THREE.Vector2(0, 0),
                },
                uResolution: {
                    value: new THREE.Vector2(0, 0),
                },
            },
            transparent: true,
            depthWrite: false,
            blending: THREE.CustomBlending,
            blendSrc: THREE.SrcAlphaFactor,
            blendDst: THREE.OneFactor,
            blendSrcAlpha: 1,
        });
    }

    createRandomAttribute() {
        const val = new Float32Array(this.count * 3);
        const setUnitW = this.parameters.viewport.width;
        const countHeight = 0

        for (let i = 0; i < this.count * 3; i += 3) {
            val[i] = Math.random() * this.parameters.viewport.width - this.parameters.viewport.width / 2;
            val[i + 1] = Math.random() * this.parameters.viewport.height - this.parameters.viewport.height / 2;
            val[i + 2] = Math.random() * -1 + 1;
        }
        return val;
    }
    createPositionTexture() {
        const data = new Float32Array(this.count * 4); // RGBA (x, y, z, placeholder)

        for (let i = 0; i < this.count; i++) {
            data[i] = Math.random() * this.parameters.viewport.width - this.parameters.viewport.width / 2;
            data[i + 1] = Math.random() * this.parameters.viewport.height - this.parameters.viewport.height / 2;
            data[i + 2] = Math.random() * -1 + 1;
            data[i * 4 + 3] = 0; // Reserved
        }

        const texture = new THREE.DataTexture(
            data,
            this.count, 1, // Width, height
            THREE.RGBAFormat,
            THREE.FloatType
        );
        texture.needsUpdate = true;

        return texture;
    }

    createVelocityTexture() {
        const data = new Float32Array(this.count * 4); // RGBA (x, y, z, placeholder)

        for (let i = 0; i < this.count; i++) {
            data[i * 4] = Math.random() * 2 - 1; // vx
            data[i * 4 + 1] = Math.random() * 2 - 1; // vy
            data[i * 4 + 2] = Math.random() * 2 - 1; // vz
            data[i * 4 + 3] = 0; // Reserved
        }

        const texture = new THREE.DataTexture(
            data,
            this.count, 1, // Width, height
            THREE.RGBAFormat,
            THREE.FloatType
        );
        texture.needsUpdate = true;

        return texture;
    }

    createSizeAttribute() {
        const val = new Float32Array(this.count);

        for (let i = 0; i < this.count; i++) {
            val[i] = Math.random() * 1 + 0.42;
        }

        return val;
    }

    createMutilAttribute() {
        const val = new Float32Array(this.count * 3);

        for (let i = 0; i < this.count * 3; i += 3) {
            val[i] = Math.random(); // Alpha
            val[i + 1] = Math.floor(Math.random() * 5); // 5 types
            val[i + 2] = 0; // Placeholder for future use
        }

        return val;
    }

    createAttributes() {
        this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(this.randomAttribute, 3));
        this.geometry.setAttribute('size', new THREE.Float32BufferAttribute(this.propsSizeAttribute, 1));
        this.geometry.setAttribute('propsmutil', new THREE.Float32BufferAttribute(this.propsMutilAttribute, 3));
    }

    render() {
        this.material.uniforms.uTime.value = performance.now() * .001
        this.renderer.render(this.scene, this.camera);
    }
}
