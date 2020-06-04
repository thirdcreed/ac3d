import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { Renderer, THREE } from 'expo-three'
import { Canvas, extend, useThree } from 'react-three-fiber'
import Effects from './Effects'
import Rig from './Rig'
import { Thing } from './Thing'
import Track from './Track'
import shadertest from './shadertest'

export default function SplashScreen() {
    const [value, onChangeText] = useState('Useless Placeholder')
    const submit = () => {
        alert('Submitted ' + value)
    }

    return (
        <View style={{ flex: 1 }}>
            <Canvas
                concurrent
                gl={{ antialias: false, alpha: false }}
                camera={{ position: [0, 0, 0], near: 0.01, far: 1000, fov: 70 }}
                onCreated={({ gl, camera }) => {
                    gl.toneMapping = THREE.Uncharted2ToneMapping
                    gl.setClearColor(new THREE.Color('#000'))
                }}
                style={{ backgroundColor: '#fefefe' }}
            >
                {/* <CameraControls /> */}
                <fog attach="fog" args={['#070710', 100, 700]} />
                <ambientLight intensity={0.25} />
                {/* <Stars /> */}
                <Thing />
                {/* <Track /> */}
                {/* <Rig /> */}
                <Effects />
                {/* <OrbitControls /> */}
            </Canvas>
            {/* <TextInput
                style={{
                    height: 60,
                    borderColor: 'gray',
                    borderWidth: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: '#fff',
                    padding: 12,
                    fontSize: 18,
                    position: 'absolute',
                    top: 350,
                    left: 40,
                    width: '80%'
                }}
                onChangeText={(text) => onChangeText(text)}
                value={value}
            />
            <View style={{ position: 'absolute', top: 420, left: 160 }}>
                <Text
                    onPress={submit}
                    style={{
                        // backgroundColor: '#999',
                        color: '#fff',
                        height: 40,
                        width: 340
                    }}
                >
                    Submit
                </Text>
            </View> */}
            {/* <Effects /> */}
        </View>
    )
}
