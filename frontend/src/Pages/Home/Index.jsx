
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame,extend,useThree} from '@react-three/fiber'
import {  MeshReflectorMaterial, Environment, shaderMaterial,OrbitControls,CameraShake,ScrollControls,Scroll} from '@react-three/drei'
import styled from 'styled-components'
import glsl from 'babel-plugin-glsl/macro'
import "./Index.css"
import Navbar from '../../Component/Navbar/Navbar'


const GOLDENRATIO = 1.61803398875;

export default function Home() {
  return (
    <>
      {" "}
      <MainContainer>
        <Canvas>
          <color attach="background" args={["#191920"]} />
          <fog attach="fog" args={["#191920", 0, 15]} />
          <Environment preset="city" />
          <CameraShake
            yawFrequency={0.1}
            pitchFrequency={0.1}
            rollFrequency={0.1}
          />
          <ScrollControls pages={0}>
            <Scroll>
              <Rig>
                <Frame />
                <Ground />
              </Rig>
            </Scroll>
            <Scroll html>
                <h1>Hello World</h1>
                
            </Scroll>
          </ScrollControls>
        </Canvas>
      </MainContainer>
    </>
  );
}

function Frame({ url, c = new THREE.Color(), ...props }) {
  const portalMaterial = useRef();
  const frame = useRef();
  useFrame((state, delta) => (portalMaterial.current.uTime += delta));
  return (
    <group {...props}>
      <mesh
        scale={[3, GOLDENRATIO * 2.5, 0.05]}
        position={[-3, (GOLDENRATIO * 2.5) / 2, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial
          color="#151515"
          metalness={0.5}
          roughness={0.5}
          envMapIntensity={2}
        />
        <mesh
          ref={frame}
          raycast={() => null}
          scale={[0.9, 0.93, 0.9]}
          position={[0, 0, 0.2]}
        >
          <boxGeometry />
          <portalMaterial
            ref={portalMaterial}
            blending={THREE.AdditiveBlending}
            uColorStart="pink"
            uColorEnd="white"
          />
        </mesh>
      </mesh>
    </group>
  );
}
extend({
  // shaderMaterial creates a THREE.ShaderMaterial, and auto-creates uniform setter/getters
  // extend makes it available in JSX, in this case <portalMaterial />
  PortalMaterial: shaderMaterial(
    {
      uTime: 0,
      uColorStart: new THREE.Color("hotpink"),
      uColorEnd: new THREE.Color("white"),
    },
    glsl`
      varying vec2 vUv;
      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;
        gl_Position = projectionPosition;
        vUv = uv;
      }`,
    glsl`
      #pragma glslify: cnoise3 = require(glsl-noise/classic/3d.glsl) 
      uniform float uTime;
      uniform vec3 uColorStart;
      uniform vec3 uColorEnd;
      varying vec2 vUv;
      void main() {
        vec2 displacedUv = vUv + cnoise3(vec3(vUv * 7.0, uTime * 0.1));
        float strength = cnoise3(vec3(displacedUv * 5.0, uTime * 0.2));
        float outerGlow = distance(vUv, vec2(0.5)) * 4.0 - 1.4;
        strength += outerGlow;
        strength += step(-0.2, strength) * 0.8;
        strength = clamp(strength, 0.0, 1.0);
        vec3 color = mix(uColorStart, uColorEnd, strength);
        gl_FragColor = vec4(color, 1.0);
      }`
  ),
});

function Rig({ children }) {
  const ref = useRef();
  const vec = new THREE.Vector3();
  const { camera, mouse } = useThree();
  useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, 2, 5.5), 0.05);
    ref.current.position.lerp(vec.set(mouse.x * 1, mouse.y * 0.1, 0), 0.1);
    //   ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (-mouse.x * Math.PI) / 20, 0.1)
  });
  return (
    <group ref={ref} position={[0, -1.5, 0]}>
      {children}
    </group>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[50, 50]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={2048}
        mixBlur={1}
        mixStrength={40}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#101010"
        metalness={0.5}
      />
    </mesh>
  );
}

export const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;
