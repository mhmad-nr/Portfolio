import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import Engine from './Engine'



export class Loader {

    private textureLoader: THREE.TextureLoader
    private gltfLoader: GLTFLoader


    constructor(private engine: Engine) {
        this.textureLoader = new THREE.TextureLoader()
        this.gltfLoader = new GLTFLoader()
    }
    async loadModel(image: string) {
        const gltf = await this.gltfLoader.loadAsync(image + '?v=' + Date.now)
       
        return gltf.scene

    }
    async loadTexture(image: string): Promise<THREE.Texture> {
        const texture = await this.textureLoader.loadAsync(image + '?v=' + Date.now)
        return texture
    }

    loadTextures(images: string[]) {
        const promiss = images.map(async (image, index) => {
            return new Promise<THREE.Texture>(async (resolve, reject) => {
                try {
                    const texture = await this.loadTexture(image)
                    resolve(texture)

                } catch (err) {
                    reject(err)
                }
            })
        })
        return Promise.all(promiss)
    }




}