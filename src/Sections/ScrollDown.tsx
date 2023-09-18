import { useContext, useEffect } from "react"
import gsap from 'gsap'
import { ThemeProvider } from "../contex"
const ScrollDown = () => {
    const { isDark } = useContext(ThemeProvider)
    useEffect(() => {
        const replay = () => {
            setTimeout(() => {
                handTL.play(0);
            }, 2000)
        }
        const handTL = gsap.timeline({ repeat: 3, onComplete: replay });
        handTL.to('.hand', { y: 20, ease: 'power2.inOut', duration: 0.2 })
        handTL.to('.hand', { y: 0, ease: 'power2.inOut', duration: 0.2 })
    }, [])

    return (

        <section className='flex justify-center items-center'>
            <div className="galss-container w-[500px] h-[300px] flex justify-center items-center rounded-[16px]" >
                <p className={isDark ? "text-W" : ""}>Scroll Down</p>
                <p className="hand">👇</p>
            </div>
        </section>

    )
}

export default ScrollDown

