import Engine from './Engine'
import * as CANNON from 'cannon-es'

interface thing {
    mesh: THREE.Object3D;
    physic?: CANNON.Body
}

const isExist = (things: thing[], thing: thing): boolean => things.indexOf(thing) == -1

export class Object3D {


    public things: thing[] = []

    constructor(private engine: Engine) { }

    add(thing: thing) {
        if (!isExist(this.things, thing)) return
        this.things.push(thing)
        this.engine.scene.add(thing.mesh)
        if (thing.physic) {
            this.engine.physics.world.addBody(thing.physic)
        }
    }
    remove(thing: thing) {
        if (isExist(this.things, thing)) return
        const newThings = this.things.filter((e) => e != thing)
        this.things = newThings
        this.engine.scene.remove(thing.mesh)
    }
}