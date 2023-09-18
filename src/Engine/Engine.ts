import * as THREE from "three"
import { Camera } from './Camera'
import { Physic } from "./Physic"
import { RenderEngine } from './RenderEngine'
import { RenderLoop } from './RenderLoop'
import { Sizes } from './Sizes'
import { Object3D } from "./Object3D"
import { Mouse } from "./Mouse"
import { Loader } from "./Loader"

class Engine {
    public readonly scene!: THREE.Scene
    public readonly physics!: Physic
    public readonly time!: RenderLoop
    public readonly object3D!: Object3D
    public readonly updates: any[] = []
    public readonly sizes!: Sizes
    public readonly camera!: any
    public readonly renderEngine!: RenderEngine
    public readonly canvas!: HTMLCanvasElement
    public readonly mouse!: Mouse
    public readonly loader!: Loader

    constructor() {

        const canvas = document.createElement("canvas")
        document.body.appendChild(canvas)

        this.canvas = canvas
        this.sizes = new Sizes(this)
        this.scene = new THREE.Scene()
        this.camera = new Camera(this)
        this.renderEngine = new RenderEngine(this)
        this.physics = new Physic(this)
        this.time = new RenderLoop(this)
        this.object3D = new Object3D(this)
        this.mouse = new Mouse(this)
        this.loader = new Loader(this)

        this.updates = [this.physics, this.camera, this.renderEngine, this.mouse]
        this.update()
    }


    addToLoop(needUpdate: object) {
        this.updates.push(needUpdate)
    }
    update() {
        this.camera.update()
        this.renderEngine.update()
    }

    resize() {

        this.camera.resize()
        this.renderEngine.resize()

    }
}
export default Engine 