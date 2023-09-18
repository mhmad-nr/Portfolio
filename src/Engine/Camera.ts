import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Engine from './Engine'
export class Camera {

    public instance!: THREE.PerspectiveCamera
    private controls!: OrbitControls

    constructor(private engine: Engine) {
        this.initCamera()
        // this.initControls()
    }

    private initCamera() {
        this.instance = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        this.instance.position.z = 6
        this.instance.position.y = 0
        this.engine.scene.add(this.instance)
    }

    private initControls() {
        this.controls = new OrbitControls(this.instance, this.engine.canvas)
        this.controls.enableDamping = true
        this.controls.update()

    }

    resize() {
        this.instance.aspect = this.engine.sizes.aspectRatio
        this.instance.updateProjectionMatrix()
    }

    update() {
        // this.controls.update()

    }
}