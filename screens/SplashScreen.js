import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { THREE } from 'expo-three'
import { Canvas, extend, useFrame, useThree } from 'react-three-fiber'
import Effects from './Effects'
import LoginOverlay from './LoginOverlay'
import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { TrackballControls } from 'drei'

extend({ DeviceOrientationControls, OrbitControls })

const CameraControls = () => {
    // Get a reference to the Three.js Camera, and the canvas html element.
    // We need these to setup the OrbitControls component.
    // https://threejs.org/docs/#examples/en/controls/OrbitControls
    const {
        camera,
        gl: { domElement }
    } = useThree()
    // Ref to the controls, so that we can update them on every frame using useFrame
    const controls = useRef()
    useFrame((state) => controls.current.update())
    return <deviceOrientationControls ref={controls} args={[camera]} />
    // return (
    //     <orbitControls
    //         ref={controls}
    //         args={[camera, domElement]}
    //         enableZoom={false}
    //         maxAzimuthAngle={Math.PI / 4}
    //         maxPolarAngle={Math.PI}
    //         minAzimuthAngle={-Math.PI / 4}
    //         minPolarAngle={0}
    //     />
    // )
}

export default function SplashScreen() {
    // let theCamera, controls

    // const [yoCamera, setCamera] = useState(null)

    return (
        <View style={{ flex: 1 }}>
            <Canvas
                concurrent
                onCreated={(props) => {
                    // console.log('onCreated props:', props)
                    // console.log('DeviceOrientationControls', DeviceOrientationControls)
                    const { camera, gl, scene } = props
                    // theCamera = camera
                    // setCamera(camera)
                    // console.log(theCamera)
                    gl.setClearColor(0x000000)
                    // https://stackoverflow.com/questions/37083229/three-js-gridhelper-makes-non-standard-grid
                    var grid = new THREE.GridHelper(10, 10, 0xff0000, 0x00ff00)
                    grid.geometry.rotateX(Math.PI / 2)
                    var vector = new THREE.Vector3(1, 1, 1)
                    grid.lookAt(vector)
                    scene.add(grid)

                    // controls = new DeviceOrientationControls(camera)
                    // controls.connect()
                    // console.log('controls:', controls)
                }}
            >
                <CameraControls />
                <ambientLight intensity={0.75} />
                <Effects />
                {/* <TrackballControls /> */}
            </Canvas>
            <LoginOverlay />
        </View>
    )
}
