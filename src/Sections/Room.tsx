import React, { useContext, useEffect } from 'react'
import { EngineProvider } from '../contex';
import * as THREE from "three"
import { translateTo } from '../utils';



type props = {
    position: {
        x: number,
        y: number,
        z: number
    }
}

const Room: React.FC<props> = ({ position }) => {
    const engine = useContext(EngineProvider)

    useEffect(() => {

        initRoom()

    }, [])

    const initRoom = async () => {
        const { loader, object3D, sizes } = engine
        const group = new THREE.Group()

        // add DirectionalLight for room 
        const DirectionalLight = new THREE.DirectionalLight("#fff", 0.2)
        DirectionalLight.position.set(8, 9, 18)
        object3D.add({ mesh: DirectionalLight })
        DirectionalLight.translateY(3)

        // add HemisphereLight for room 
        const HemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.8);
        group.add(HemisphereLight);
        object3D.add({ mesh: HemisphereLight })
        translateTo(HemisphereLight, position)
        HemisphereLight.position.set(-100, -100, 100)


        // laod and add room model
        const model = await loader.loadModel("src/assets/Models/untitled.glb")

        model.scale.set(0.05, 0.05, 0.05)
        object3D.add({ mesh: model })
        translateTo(model, position)
    }

    return (

        <section></section>

    )
}

export default Room

