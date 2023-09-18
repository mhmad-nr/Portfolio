import React, { createContext, useEffect, useRef, useState } from 'react'
import Engine from './Engine/Engine'
import * as THREE from "three"


type Props = {
    children: React.ReactNode,
}

export const EngineProvider = createContext<Engine>({} as Engine)


type themeType = {
    isDark: boolean,
    setIsDark: React.Dispatch<React.SetStateAction<boolean>>
}
export const ThemeProvider = createContext<themeType>({} as themeType)


export const Provider: React.FC<Props> = ({ children }) => {

    const [isDark, setIsDark] = useState<boolean>(true);

    // const [engine] = useState<Engine>(new Engine());

    const engineRef = useRef<Engine>(new Engine());
    const engine = engineRef.current

    useEffect(() => {
        // init 3d engine 
        // const { current: engine } = engineRef
        // // setup 3d scene 
        const color = isDark ? 0x4c4c4c : 0xf1f1f1
        engine.scene.background = new THREE.Color(color)
        engine.scene.fog = new THREE.Fog(color, 15, 20)

        // // setup 3d camera
        engine.camera.instance.position.set(0, 0, 6)
        // engine.camera.instance.rotation.x = Math.PI / 8


    })


    return (
        <ThemeProvider.Provider value={{ isDark, setIsDark }} >
            <EngineProvider.Provider value={engine}>
                {children}
            </EngineProvider.Provider>
        </ThemeProvider.Provider >
    )
}


