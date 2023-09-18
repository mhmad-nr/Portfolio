import * as THREE from "three"
import Engine from './Engine'


type currentType = {
    object: THREE.Object3D
    state: any
}
export class Mouse {

    public mouse!: THREE.Vector2

    public currentObject!: currentType | undefined
    public lastObject: currentType[] = []

    public raycaster !: THREE.Raycaster

    public cursor = {
        x: 0,
        y: 0
    }

    constructor(private engine: Engine) {
        const { width, height } = engine.sizes
        // this.initControls()
        this.currentObject = undefined
        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2()
        window.addEventListener('mousemove', (event) => {
            this.cursor.x = event.clientX / width - 0.5
            this.cursor.y = event.clientY / height - 0.5
        })

        window.addEventListener('pointermove', this.onPointerMove.bind(this));
    }
    onPointerMove(event: PointerEvent) {
        const { width, height } = this.engine.sizes

        // calculate pointer position in normalized device coordinates
        // (-1 to +1) for both components

        this.mouse.x = (event.clientX / width) * 2 - 1;
        this.mouse.y = - (event.clientY / height) * 2 + 1;

    }
    hover() {
        const { scene, camera } = this.engine

        // for when page is reloaded
        if (this.mouse.x == 0 && this.mouse.y == 0) return

        this.raycaster.setFromCamera(this.mouse, camera.instance);
        // console.log(this.currentObject);

        // calculate objects intersecting the picking ray
        const intersects = this.raycaster.intersectObjects(scene.children);

        if (intersects.length != 0) {
            for (let i = 0; i < intersects.length; i++) {

                const newObject = {
                    object: intersects[0].object,
                    state: intersects[0].object.userData["state"]
                }

                if (!this.currentObject) {

                    this.currentObject = newObject

                }

                this.lastObject.map((object) => {
                    if (newObject.object == object.object) {
                        this.deleteItem(object)
                    }
                })
            }
        } else {

            // check if the currentObject is not existing 
            if (this.currentObject) {
                this.lastObject.push(this.currentObject)
                this.currentObject = undefined
            }


        }
    }

    change() {
        // console.log(this.currentObject);
        // console.log("lastObject", this.lastObject);

        if (this.currentObject) {
            const { object, state } = this.currentObject
            if (state) {
                state.hover(this.engine.time.deltaTime)

            }

        }

        this.lastObject.filter((object) => {
            const state = object.state
            if (object == this.currentObject) return true

            if (state) {
                const res = state.rehover(this.engine.time.deltaTime)
                if (res) {
                    this.deleteItem(object)
                }
            }

        })
    }
    deleteItem(object: currentType) {
        const index = this.lastObject.indexOf(object);
        if (index > -1) { // only splice array when item is found
            this.lastObject.splice(index, 1); // 2nd parameter means remove one item only
        }
    }
    update() {

        this.hover()
        this.change()

    }
}