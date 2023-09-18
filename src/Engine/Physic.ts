import * as CANNON from 'cannon-es'
import * as THREE from 'three'
import Engine from './Engine'
export class Physic {

    public world!: CANNON.World

    constructor(private engine: Engine) {
        this.initWorld()
    }
    initWorld() {

        this.world = new CANNON.World()
        this.world.broadphase = new CANNON.SAPBroadphase(this.world)
        this.world.allowSleep = true
        this.world.gravity.set(0, 0, 0)

        // Default material
        const defaultMaterial = new CANNON.Material('default')
        const defaultContactMaterial = new CANNON.ContactMaterial(
            defaultMaterial,
            defaultMaterial,
            {
                friction: 0.1,
                restitution: 0.1
            }
        )
        this.world.defaultContactMaterial = defaultContactMaterial

    }
    update() {
        const { time, object3D } = this.engine
        this.world.step(1 / 60, time.deltaTime, 3)
        object3D.things.map((thing) => {
            if (thing.physic) {
                const { x: pX, y: pY, z: pZ } = thing.physic.position
                const { x: qX, y: qY, z: qZ } = thing.physic.quaternion

                thing.mesh.position.copy(new THREE.Vector3(pX, pY, pZ))
                thing.mesh.quaternion.copy(new THREE.Quaternion(qX, qY, qZ))
            }
        })

    }


}
