import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, PresentationControls, Environment, ContactShadows, Html } from '@react-three/drei'

export function Watch(props) {
    const ref = useRef()
    const { nodes, materials } = useGLTF('/watch-v1.glb')
    useFrame((state) => {
      const t = state.clock.getElapsedTime()
      ref.current.rotation.x = -Math.PI / 1.75 + Math.cos(t / 4) / 8
      ref.current.rotation.y = Math.sin(t / 4) / 8
      ref.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20
      ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
    })
    return (
      <group ref={ref} {...props} dispose={null}>
        <mesh geometry={nodes.Object005_glass_0.geometry} material={materials.glass}>
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.Object006_watch_0.geometry} material={materials.watch} />
      </group>
    )
  }
  