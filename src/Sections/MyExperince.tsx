import React, { forwardRef, useContext, useEffect, useState } from 'react'
import *as THREE from "three";
import { EngineProvider } from '../contex'
import gsap, { Expo } from 'gsap';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { ReactComponent as MaximizeSvg } from "../assets/svg/arrow_right.svg"
import "swiper/css";
import { translateTo } from '../utils';

const vert = `
varying vec2 vUv;
void main() {
  vUv = uv;sad
}
`

const frag = `
varying vec2 vUv;

uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D disp;

uniform float dispPower;
uniform float intensity;

uniform vec2 size;
uniform vec2 res;

vec2 backgroundCoverUv( vec2 screenSize, vec2 imageSize, vec2 uv ) {
  float screenRatio = screenSize.x / screenSize.y;
  float imageRatio = imageSize.x / imageSize.y;
  vec2 newSize = screenRatio < imageRatio 
      ? vec2(imageSize.x * (screenSize.y / imageSize.y), screenSize.y)
      : vec2(screenSize.x, imageSize.y * (screenSize.x / imageSize.x));
  vec2 newOffset = (screenRatio < imageRatio 
      ? vec2((newSize.x - screenSize.x) / 2.0, 0.0) 
      : vec2(0.0, (newSize.y - screenSize.y) / 2.0)) / newSize;
  return uv * screenSize / newSize + newOffset;
}

void main() {
  vec2 uv = vUv;
  
  vec4 disp = texture2D(disp, uv);
  vec2 dispVec = vec2(disp.x, disp.y);
  
  vec2 distPos1 = uv + (dispVec * intensity * dispPower);
  vec2 distPos2 = uv + (dispVec * -(intensity * (1.0 - dispPower)));
  
  vec4 _texture1 = texture2D(texture1, distPos1);
  vec4 _texture2 = texture2D(texture2, distPos2);
  
  gl_FragColor = mix(_texture1, _texture2, dispPower);
}
`

type props = {
    ref: HTMLDivElement,
    position: {
        x: number,
        y: number,
        z: number
    }
}

type state = {
    index: number,

    disp: {
        image: string,
        texture: THREE.Texture | null
    },

    data:
    {
        url: string,
        discription: string,
        name: string,
        gitHub: undefined | string,
        image: string,
        texture: THREE.Texture | null
    }[]

}
const MyExperince = forwardRef<HTMLDivElement, props>(({ position }, ref) => {


    const engine = useContext(EngineProvider)
    const [state, setState] = useState<state>(
        {
            index: 0,
            disp: {
                image: "src/assets/img/rock.jpg",
                texture: null
            },
            data: [
                {
                    name: "Karsin",
                    url: "https://karsin.ir",
                    image: "src/assets/img/karsin.ir.jpg",
                    discription: "a website for karsin that includes  many other images and images ",
                    gitHub: undefined,
                    texture: null
                },
                {
                    name: "Testchin",
                    url: "https://testchin.ir",
                    image: "src/assets/img/testchin.ir.jpg",
                    discription: "a website for karsin that includes  many other images and images ",
                    gitHub: undefined,
                    texture: null
                },
                {
                    name: "Portfolio",
                    url: "https://Portfolio.com",
                    image: "src/assets/img/portfolio.jpg",
                    discription: "a website for karsin that includes  many other images and images ",
                    gitHub: "https://github.com/mhmad-nr/Portfolio",
                    texture: null
                },

            ]
        }
    )
    const [isDuration, setIsDuration] = useState(false)

    useEffect(() => {
        init().then((e) => {

        })

    }, [])

    const setTextures = (): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            const disp = await engine.loader.loadTexture(state.disp.image)
            disp.magFilter = disp.minFilter = THREE.LinearFilter
            disp.wrapS = disp.wrapT = THREE.RepeatWrapping
            const images = state.data.map((item) => item.image)

            const textures = await engine.loader.loadTextures(images)
            textures.map((texture) => {
                texture.minFilter = THREE.LinearFilter
                texture.generateMipmaps = false
            })

            const newData = state.data.map((item, index) => {
                if (item.texture == null) {
                    item.texture = textures[index]
                }
                return item
            })
            const newDisp = {
                image: state.disp.image,
                texture: disp
            }
            const newState = {
                index: state.index + 1,
                data: newData,
                disp: newDisp
            }

            setState({ ...newState })

            resolve(newState)
        })
    }
    const changeTexture = (obj: THREE.Mesh, isReverse: boolean = false) => {

        const { uniforms } = obj.material as THREE.ShaderMaterial

        const [first, second] = getCurrentTextures(isReverse)

        uniforms.texture1.value = first
        uniforms.texture2.value = second



    }
    const getCurrentTextures = (isReverse: boolean) => {
        const count = state.data.length
        const { index } = state

        const textures = state.data.map(({ texture }) => texture)

        let currentTextures: (THREE.Texture | null)[]

        if (count == index + 1) {
            const first = textures[0];
            const last = textures[textures.length - 1];
            currentTextures = [last, first]
            setState({ ...state, index: 0 })
        } else {
            currentTextures = textures.slice(index, index + 2)
            setState({ ...state, index: state.index + 1 })
        }
        return currentTextures
    }
    const desktopAnimation = (isReverse: boolean) => {

        if (isDuration) return

        setIsDuration(true)

        const obj: THREE.Mesh = engine.scene.children.filter((item) => {
            if (item.geometry instanceof THREE.PlaneGeometry) {
                console.log(item);
                return item
            }
        })[0]

        gsap.to((obj as THREE.Mesh).material.uniforms.dispPower, 0.5, {
            value: 1,
            ease: Expo.easeInOut,
            onUpdate: () => engine.time.update(),
            onComplete: () => {
                obj.material.uniforms.dispPower.value = 0.0
                changeTexture(obj, isReverse)

            }
        })

    }

    const init = async () => {
        const { data, disp } = await setTextures()
        const textures = data.map(({ texture }: { texture: THREE.Texture }) => texture)

        const { width, height, aspectRatio } = engine.sizes

        const mat = new THREE.ShaderMaterial({
            uniforms: {
                dispPower: { type: 'f', value: 0.0 },
                intensity: { type: 'f', value: 0.5 },
                res: { value: new THREE.Vector2(width, height) },
                size: { value: new THREE.Vector2(1, 1) },
                texture1: { type: 't', value: textures[0] },
                texture2: { type: 't', value: textures[1] },
                disp: { type: 't', value: disp.texture }
            },
            transparent: true,
            vertexShader: vert,
            fragmentShader: frag
        })

        const plane = {
            width: aspectRatio * 2,
            height: aspectRatio
        }
        const geometry = new THREE.PlaneGeometry(
            plane.width,
            plane.height,
            1
        )

        const mesh = new THREE.Mesh(geometry, mat)
        // mesh.position.y = 1
        // mesh.material.visible = false
        mesh.scale.set(1.8, 1.8, 1.8)
        mesh.translateX(10)
        mesh.rotation.y = Math.PI / 2
        mesh.position.set(1, position.y, -28.4)
        // gui.add(mesh.position, "x").min(-50).max(50)
        // gui.add(mesh.position, "z").min(-50).max(50)
        // console.log(gui);
        // const element = gui.domElement
        // element.classList.add("element")
        // document.body.append(element)

        engine.object3D.add({ mesh })
        // this.scene.add(mesh)


    }

    return (
        <>

            <section ref={ref} className='experince'>
                <div className='w-full flex justify-center'>
                    <MaximizeSvg className='rotate-180  absolute top-1/2 left-1/4 swiper-button-prev z-50' />
                    <MaximizeSvg className='absolute top-1/2 right-1/4 swiper-button-next z-50' />
                </div>
                <Swiper

                    onSlidePrevTransitionStart={() => desktopAnimation(true)}
                    onSlidePrevTransitionEnd={(e) => setIsDuration(false)}

                    onSlideNextTransitionStart={() => desktopAnimation(false)}
                    onSlideNextTransitionEnd={(e) => setIsDuration(false)}
                    className="mySwiper"
                    loop={true}
                    allowTouchMove={false}
                    navigation={{
                        enabled: !isDuration,
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    speed={500}
                    modules={[Navigation]}
                >
                    {state.data.map(({ name, discription, url, gitHub }) => {

                        return <SwiperSlide key={name}>
                            <div className='w-full pt-[15rem] h-screen flex items-center justify-center'>
                                <div className='p-4 rounded-lg galss-container'>
                                    <h2 className='text-2xl font-bold text-[#4c4c4c] capitalize'>{name}</h2>
                                    <div className='w-96'>
                                        <p className='text-sm text-slate-600'>{discription}</p>
                                    </div>

                                    <a className='block text-blue-600 font-bold text-base capitalize my-2' href={url}>visit</a>
                                    {gitHub && <a className='block text-blue-600 font-bold text-base capitalize' href={gitHub}>see source</a>}
                                </div>

                            </div>
                        </SwiperSlide>
                    })}


                </Swiper>
            </section >
        </>
    )
})

export default MyExperince