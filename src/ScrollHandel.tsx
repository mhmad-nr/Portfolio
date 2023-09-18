import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { EngineProvider } from './contex'
import gsap from "gsap"
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import First from './Sections/First'
import Welcome from './Sections/Welcome';
import ScrollDown from './Sections/ScrollDown';
import MyExperince from './Sections/MyExperince';
import * as THREE from "three"
import Room from './Sections/Room';
import * as dat from 'dat.gui';
const gui = new dat.GUI();

gsap.registerPlugin(ScrollTrigger);

const ScrollHandel = () => {

    const [state, setState] = useState(false)
    const engine = useContext(EngineProvider)

    const revealRefs = useRef<HTMLDivElement[]>([]);
    const experinceRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const firstRef = useRef<HTMLDivElement>(null);
    const secondRef = useRef<HTMLDivElement>(null);
    revealRefs.current = [];



    useEffect(() => {

        initAnimation()

    }, []);

    const initAnimation = () => {
        desktopAnimation()
        gsap.matchMedia({
            "(prefers-reduced-motion: no-preference)": desktopAnimation
        });
    }

    const desktopAnimation = () => {

        let section = 0;
        const tl = gsap.timeline({
            default: {
                duration: 1,
                ease: "power2.inOut"
            },
            scrollTrigger: {
                toggleActions: "",
                trigger: wrapperRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.1,
                markers: false
            }
        });
        const element = gui.domElement
        element.classList.add("element")
        document.body.append(element)
        tl.to(engine.camera.instance.position, { y: 0, z: 0 }, section);


        section += 1;
        tl.to(engine.camera.instance.position, { y: -8, z: -16 }, section);

        section += 1;
        tl.to(engine.camera.instance.position, { x: 6, y: -18, z: -28.5 }, section);
        tl.to(engine.camera.instance.rotation, { y: Math.PI / 2 }, section);

        section += 1;
        tl.to(engine.camera.instance.position, { z: -35 }, section);
        tl.to(engine.camera.instance.rotation, { y: 0 }, section);
        section += 1;
        tl.to(engine.camera.instance.position, { z: -40.66, x: 6.81, y: -18.25}, section);

        // gui.add(engine.camera.instance.position, "x").min(-100).max(100).step(0.01)
        // gui.add(engine.camera.instance.position, "y").min(-100).max(100).step(0.01)
        // gui.add(engine.camera.instance.position, "z").min(-100).max(100).step(0.01)


        console.log(experinceRef.current);

    };


    return (
        <>
            <div ref={wrapperRef} className=''>

                <ScrollDown />

                <Welcome position={{
                    x: 0,
                    y: 0,
                    z: -12,
                }} />
                <First position={{
                    x: -16,
                    y: -4,
                    z: -28.5,
                }} />

                <MyExperince ref={experinceRef} position={{
                    x: 0,
                    y: -17,
                    z: -38,
                }} />
                <Room position={{
                    x: 6,
                    y: -19,
                    z: -40,
                }} />
                <section></section>
            </div >
        </>
    )
}

export default ScrollHandel