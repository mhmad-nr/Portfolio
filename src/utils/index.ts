import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import Engine from "../Engine/Engine";

type positionType = {
    x: number,
    y: number,
    z: number
}

type textType = {
    texts: string[],
    engine: Engine,
    position: positionType,
    isCenter: boolean
}
const translateTo = (object: THREE.Object3D, position: positionType) => {
    object.translateX(position.x)
    object.translateY(position.y)
    object.translateZ(position.z)
}


const initText = async (_: textType) => {
    const { position, texts, isCenter } = _
    const loader = new FontLoader();
    let meshs: THREE.Object3D[] = []

    const font = await loader.loadAsync("src/assets/font.json")

    const colors = [0x3f00c6, 0xfa0427, 0xfb2b03, 0xfb8500]

    let shapes: THREE.Shape[][] = []

    for (let text in texts) {
        shapes.push(font.generateShapes(texts[text], 2))
    }

    for (let i = 0; i < shapes.length; i++) {
        const geometry = new THREE.ShapeGeometry(shapes[i]);

        // if (!isCenter) {
        //     geometry.computeBoundingBox();
        //     if (geometry.boundingBox) {
        //         geometry.translate(
        //             -geometry.boundingBox.max.x * 0.5,
        //             -(geometry.boundingBox.max.y * 0.5) + 2,
        //             geometry.boundingBox.max.z * 0.5
        //         )
        //     }
        // }

        const matLite = new THREE.MeshBasicMaterial({
            color: new THREE.Color(colors[i]),
            opacity: 1,
            side: THREE.DoubleSide
        });

        const mesh = new THREE.Mesh(geometry, matLite);

        // get size of text  f
        const boundingBox = new THREE.Box3().setFromObject(mesh)
        const size = boundingBox.getSize(new THREE.Vector3()) // Returns Vector3

        const smallY = (size.y) / 2
        const smallX = (size.x) / 2
        mesh.translateX(-smallX)
        mesh.translateY(-smallY)



        // add cube for surrounding text 
        const BoxGeometry = new THREE.BoxGeometry(size.x + size.x / 10, size.y + size.y / 10, size.z);
        const material = new THREE.MeshBasicMaterial({ color: "red", opacity: 0 });
        material.transparent = true;
        const cube = new THREE.Mesh(BoxGeometry, material);
        cube.translateX(smallX)
        cube.position.y = - 2.3 * i;

        // if (isCenter) {
        //     mesh.translateY(-(size.y - smallY / 2))
        // } else {

        // }

        // add text to cube
        cube.add(mesh)

        // set cube position 
        translateTo(cube, position);

        // push current text to other texts 
        meshs.push(cube)
    }
    return meshs
}


export { initText, translateTo }