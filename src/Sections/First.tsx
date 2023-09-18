import React, { useContext, useEffect } from 'react'
import { EngineProvider } from '../contex';
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import Engine from '../Engine/Engine';
import { initText } from '../utils';
import gsap from "gsap"
type props = {
    position: {
        x: number,
        y: number,
        z: number
    }
}

const First: React.FC<props> = ({ position }) => {
    const engine = useContext(EngineProvider)

    useEffect(() => {

        const texts = ["Hi", "I'm Mohammad", "Front End Developer"]

        initText({ engine, position, texts, isCenter: false })
            .then((e) => {
                e.map((mesh) => {

                    engine.object3D.add({ mesh })
                })
            })

    }, [])


    return (

        <section></section>

    )
}

export default First

