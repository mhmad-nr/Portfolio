import { WebGLRenderer } from 'three'
import Engine from './Engine'
import * as THREE from 'three'

export class RenderEngine {
    public readonly renderer: WebGLRenderer

    constructor(private engine: Engine) {

        this.renderer = new WebGLRenderer({
            canvas: this.engine.canvas,
            antialias: true,
        })

        this.renderer.outputEncoding = THREE.sRGBEncoding
        this.renderer.toneMapping = THREE.CineonToneMapping
        this.renderer.toneMappingExposure = 1.75
        this.renderer.shadowMap.enabled = false
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
        this.renderer.setClearColor(0xc4c4c4)
        this.renderer.setSize(this.engine.sizes.width, this.engine.sizes.height)
        this.renderer.setPixelRatio(Math.min(this.engine.sizes.pixelRatio, 2))

    }

    update() {
        const { scene, camera } = this.engine
        // this.engine.camera
        this.renderer.render(scene, camera.instance)
    }

    resize() {
        this.renderer.setSize(this.engine.sizes.width, this.engine.sizes.height)
    }
}