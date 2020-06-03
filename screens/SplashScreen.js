import React, { useState } from 'react'
import { Button, TextInput, View } from 'react-native'
import { THREE } from 'expo-three'
import { Canvas } from 'react-three-fiber'
import Stars from './Stars'

export default function SplashScreen() {
    const [value, onChangeText] = useState('Useless Placeholder')
    const submit = () => {
        alert('Submitted ' + value)
    }
    return (
        <View style={{ flex: 1 }}>
            <Canvas
                concurrent
                gl={{ antialias: false }}
                camera={{ position: [0, 0, 2000], near: 0.01, far: 10000, fov: 70 }}
                onCreated={({ gl, camera }) => {
                    gl.gammaInput = true
                    gl.toneMapping = THREE.Uncharted2ToneMapping
                    gl.setClearColor(new THREE.Color('#02020a'))
                }}
                style={{ backgroundColor: 'black' }}
            >
                <fog attach="fog" args={['#070710', 100, 700]} />
                <ambientLight intensity={0.25} />
                <Stars />
            </Canvas>
            <TextInput
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
                <Button
                    onPress={submit}
                    style={{
                        backgroundColor: '#999',
                        color: '#fff',
                        height: 40,
                        width: 340
                    }}
                    title="Submit"
                />
            </View>
        </View>
    )
}
