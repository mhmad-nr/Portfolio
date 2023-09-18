import Engine from './Engine'
import * as THREE from 'three'

export class RenderLoop {
    private clock: THREE.Clock
    public deltaTime: number = 16
    public currentTime: number = 0

    constructor(private engine: Engine) {
        this.clock = new THREE.Clock()
        window.requestAnimationFrame(() => this.update())
    }

    update() {

        const elapsedTime = this.clock.getElapsedTime()
        const { updates } = this.engine


        this.deltaTime = elapsedTime - this.currentTime
        this.currentTime = elapsedTime

        this.engine.scene.children.map((item) => {
            if (item.userData.hasOwnProperty("rotate")) {
                console.log(elapsedTime);
                console.log(this.deltaTime);

                item.userData["rotate"].update(this.deltaTime)

            }
        })
        updates.map((item) => item.update())

        requestAnimationFrame(this.update.bind(this))
    }
}