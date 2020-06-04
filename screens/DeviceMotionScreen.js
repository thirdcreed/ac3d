import React, { useEffect, useState } from 'react'
import { StatusBar, View } from 'react-native'
import { Canvas, useThree } from 'react-three-fiber'
// import Effects from './Effects'
import { Euler, MathUtils, Quaternion, Vector3 } from 'three'
import { DeviceMotion } from 'expo-sensors'
import LoginOverlay from './LoginOverlay'
import useStore from './store'

export default function DeviceMotionScreen() {
    const [available, setAvailable] = useState(null)
    const [data, setData] = useState({})
    const actions = useStore((state) => state.actions)
    console.log('rerender :((')

    StatusBar.setBarStyle('light-content')

    const Controls = () => {
        const { camera } = useThree()
        // console.log(data.quaternion)
        // console.log('camera', camera)
        // console.log('data', data)
        camera.rotation.reorder('YXZ')
        const data = useStore((state) => state.motionData)
        if (data && data.rotation) {
            // console.log('hi')
            calculateQuaternion(camera, data)
            // console.log('did')
        }
        return null
    }

    const setObjectQuaternion = (quaternion, alpha, beta, gamma, orient) => {
        var zee = new Vector3(0, 0, 1)

        var euler = new Euler()

        var q0 = new Quaternion()

        var q1 = new Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)) // - PI/2 around the x-axis

        euler.set(beta, alpha, -gamma, 'YXZ') // 'ZXY' for the device, but 'YXZ' for us

        // console.log('here!!', quaternion)
        // return false

        quaternion.setFromEuler(euler) // orient the device

        quaternion.multiply(q1) // camera looks out the back of the device, not the top

        // quaternion.multiply(q0.setFromAxisAngle(zee, -orient)) // adjust for screen orientation

        // console.log('i see', quaternion)
        return quaternion
    }

    const calculateQuaternion = (camera, motionData) => {
        // console.log(motionData)
        const { alpha, beta, gamma } = motionData.rotation

        // const qAlpha = MathUtils.degToRad(alpha) // Z
        // const qBeta = MathUtils.degToRad(beta) // X'
        // const qGamma = MathUtils.degToRad(gamma) // Y''

        // const g
        motionData.q = { qAlpha: alpha, qBeta: beta, qGamma: gamma }

        // motionData.q = { qAlpha, qBeta, qGamma }

        // console.log('camera.quaternion?',)

        // let camera = {
        //     quarternion: new Quaternion()
        // } // placeholder
        motionData.quaternion = setObjectQuaternion(
            camera.quaternion,
            alpha,
            beta,
            gamma,
            motionData.orientation
        )
        // return false
        // setData(motionData)
    }

    useEffect(() => {
        async function checkAvailable() {
            const avail = await DeviceMotion.isAvailableAsync()
            setAvailable(avail)
            if (avail) {
                DeviceMotion.setUpdateInterval(16)
                DeviceMotion.addListener((data) => {
                    // setData(data)
                    actions.saveMotion(data)
                })
            }
        }
        checkAvailable()
        return () => {
            DeviceMotion.removeAllListeners()
        }
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <Canvas
                concurrent
                onCreated={(props) => {
                    console.log('onCreated')
                    // console.log('onCreated props:', props)
                    // console.log('DeviceOrientationControls', DeviceOrientationControls)
                    const { camera, gl, scene } = props
                    actions.init(camera)
                    // theCamera = camera
                    // setCamera(camera)
                    // console.log(theCamera)

                    gl.setClearColor(0x000000)
                    var grid = new THREE.GridHelper(50, 100, 0x00ff00, 0x18cae6)
                    grid.geometry.rotateX(Math.PI / 4)
                    // grid.geometry.translateY(-5)
                    var vector = new THREE.Vector3(1, 1, 1)
                    grid.lookAt(vector)
                    scene.add(grid)
                }}
            >
                <Controls />
                {/* <Effects /> */}
            </Canvas>
            <LoginOverlay />
        </View>
    )
}

const text = {
    color: 'white'
}
