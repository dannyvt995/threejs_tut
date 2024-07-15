import { MeshStandardMaterial, MeshDepthMaterial, RGBADepthPacking } from 'three';

export const INSTANCE_POSITION = 'customPosition'

export class InstancesMaterial extends MeshStandardMaterial {

  name = 'InstancesMaterial'

  onBeforeCompile = (shader) => {
    insertAttributesAndFunctions(shader)
    overrideLogic(shader)

    shader.uniforms.texturePosition = { value: null };
					shader.uniforms.textureVelocity = { value: null };
					shader.uniforms.time = { value: 1.0 };
					shader.uniforms.delta = { value: 0.0 };
  }

}

export class InstancesDepthMaterial extends MeshDepthMaterial {

  name = 'InstancesDepthMaterial'
  depthPacking = RGBADepthPacking

  onBeforeCompile = (shader) => {
    insertAttributesAndFunctions(shader)
    overrideLogic(shader)
  }

}

function insertAttributesAndFunctions(shader) {
  shader.vertexShader = shader.vertexShader
    .replace('void main() {', `
      attribute vec3 ${INSTANCE_POSITION};
      
      vec3 getInstancePosition(vec3 position) {
        return position + ${INSTANCE_POSITION};
      }
      
      void main() {
    `)
}

function overrideLogic(shader) {
  shader.vertexShader = shader.vertexShader
    .replace('#include <project_vertex>', OVERRIDE_PROJECT_VERTEX)
}


const OVERRIDE_PROJECT_VERTEX = `
  vec4 mvPosition = modelViewMatrix * vec4(getInstancePosition(transformed), 1.0);
  gl_Position = projectionMatrix * mvPosition;
`
