import React, { useRef } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
// import './styles.css'
import { THREE } from 'expo-three'

export function Thing() {
    const ref = useRef()
    const geometryRef = useRef()
    useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01))

    const fragmentShader = `
    varying vec3 Normal;
    varying vec3 Position;

    uniform vec3 Ka;
    uniform vec3 Kd;
    uniform vec3 Ks;
    uniform vec4 LightPosition;
    uniform vec3 LightIntensity;
    uniform float Shininess;

    vec3 phong() {
      vec3 n = normalize(Normal);
      vec3 s = normalize(vec3(LightPosition) - Position);
      vec3 v = normalize(vec3(-Position));
      vec3 r = reflect(-s, n);

      vec3 ambient = Ka;
      vec3 diffuse = Kd * max(dot(s, n), 0.0);
      vec3 specular = Ks * pow(max(dot(r, v), 0.0), Shininess);

      return LightIntensity * (ambient + diffuse + specular);
    }

    void main() {
      vec3 blue = vec3(0.0, 0.0, 1.0);
      gl_FragColor = vec4(blue*phong(), 1.0);
  }`
    const vertexShader = `
    varying vec3 Normal;
    varying vec3 Position;

    void main() {
      Normal = normalize(normalMatrix * normal);
      Position = vec3(modelViewMatrix * vec4(position, 1.0));
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `
    const uniforms = {
        // phong material uniforms
        Ka: { value: new THREE.Vector3(1, 1, 1) },
        Kd: { value: new THREE.Vector3(1, 1, 1) },
        Ks: { value: new THREE.Vector3(1, 1, 1) },
        LightIntensity: { value: new THREE.Vector4(0.5, 0.5, 0.5, 1.0) },
        LightPosition: { value: new THREE.Vector4(0.0, 2000.0, 0.0, 1.0) },
        Shininess: { value: 200.0 }
    }

    const cubeVertices = [
        [-1, -1, 1],
        [1, -1, 1],
        [-1, 1, 1],
        [1, 1, 1],
        [-1, -1, -1],
        [1, -1, -1],
        [-1, 1, -1],
        [1, 1, -1]
    ]

    const cubeFaces = [
        [0, 3, 2],
        [0, 1, 3],
        [1, 7, 3],
        [1, 5, 7],
        [5, 6, 7],
        [5, 4, 6],
        [4, 2, 6],
        [4, 0, 2],
        [2, 7, 6],
        [2, 3, 7],
        [4, 1, 0],
        [4, 5, 1]
    ]

    const customCube = (
        <geometry
            ref={geometryRef}
            attach="geometry"
            vertices={cubeVertices.map((v) => new THREE.Vector3(...v))}
            faces={cubeFaces.map((f) => new THREE.Face3(...f))}
        />
    )

    // this will not work, throws an error but i can't find the error message
    // customCube.computeFaceNormals()

    return (
        <mesh ref={ref}>
            <boxBufferGeometry attach="geometry" args={[500, 500, 500]} />
            {/* {customCube} */}
            <shaderMaterial
                attach="material"
                uniforms={uniforms}
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
            />
        </mesh>
    )
}
