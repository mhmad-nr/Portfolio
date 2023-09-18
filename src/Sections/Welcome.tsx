import { gsap } from 'gsap'
import React, { useContext, useEffect } from 'react'
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { EngineProvider } from '../contex';
import { initText } from '../utils';


type Props = {
    position: {
        x: number,
        y: number,
        z: number
    }
}

const Welcome: React.FC<Props> = ({ position }) => {


    const engine = useContext(EngineProvider)

    useEffect(() => {
        const { x, y, z } = position
        const newPosition = {
            x,
            y,
            z
        }
        const texts = ["Welcome"]
        initText({ engine, position: newPosition, texts, isCenter: true })
            .then((e) => {
                e.map((mesh) => {

                    // mesh.userData["state"] = {
                    //     scale: {
                    //         x: 0.85,
                    //         y: 0.85,
                    //         z: 0.85
                    //     },
                    //     hover: function (time: number) {
                    //         if (mesh.scale.x < this.scale.x) return true

                    //         mesh.scale.x -= this.scale.x * time
                    //         mesh.scale.y -= this.scale.y * time
                    //         mesh.scale.z -= this.scale.z * time

                    //     },
                    //     rehover: function (time: number) {
                    //         if (1.01 < mesh.scale.x)
                    //             if (mesh.scale.x < 1.1) return true
                    //         mesh.scale.x += this.scale.x * time
                    //         mesh.scale.y += this.scale.y * time
                    //         mesh.scale.z += this.scale.z * time
                    //         return false

                    //     }
                    // }


                    mesh.translateX(-6)
                    engine.object3D.add({ mesh })
                })
            })


    }, [])



    return (

        <section></section>

    )
}

export default Welcome

