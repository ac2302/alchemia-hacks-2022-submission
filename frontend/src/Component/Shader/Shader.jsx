
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame,extend,useThree} from '@react-three/fiber'
import {  MeshReflectorMaterial, Environment, shaderMaterial,OrbitControls,CameraShake,ScrollControls,Scroll} from '@react-three/drei'
import styled from 'styled-components'
import glsl from 'babel-plugin-glsl/macro'




const GOLDENRATIO = 1.61803398875;

export default function ShaderModel() {
  return (
    <>
      <MainContainer>
        <Canvas>
          <color attach="background" args={["#191920"]} />
          <fog attach="fog" args={["#191920", 0, 15]} />
          <Environment preset="city" />
          {/* <CameraShake
            yawFrequency={0.1}
            pitchFrequency={0.1}
            rollFrequency={0.1}
          /> */}
          <ScrollControls pages={0}>
            <Scroll>
                <OrbitControls/>
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
        position={[0, (GOLDENRATIO * 2.5) / 2, 0]}
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
          scale={[0.9, 0.93, 0.3]}
          position={[0, 0, 2]}
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
    { time: 0, uColor: new THREE.Color(0, 1, 0.9), uTime: 0 },
    glsl`
    precision mediump float;
  varying vec2 vUv;
  uniform float uTime;
  float colormap_red(float x) {
    if (x < 0.0) {
        return 54.0 / 255.0;
    } else if (x < 20049.0 / 82979.0) {
        return (829.79 * x + 54.51) / 255.0;
    } else {
        return 1.0;
    }
}
float colormap_green(float x) {
    if (x < 20049.0 / 82979.0) {
        return 0.0;
    } else if (x < 327013.0 / 810990.0) {
        return (8546482679670.0 / 10875673217.0 * x - 2064961390770.0 / 10875673217.0) / 255.0;
    } else if (x <= 1.0) {
        return (103806720.0 / 483977.0 * x + 19607415.0 / 483977.0) / 255.0;
    } else {
        return 1.0;
    }
}
float colormap_blue(float x) {
    if (x < 0.0) {
        return 54.0 / 255.0;
    } else if (x < 7249.0 / 82979.0) {
        return (829.79 * x + 54.51) / 255.0;
    } else if (x < 20049.0 / 82979.0) {
        return 127.0 / 255.0;
    } else if (x < 327013.0 / 810990.0) {
        return (792.02249341361393720147485376583 * x - 64.364790735602331034989206222672) / 255.0;
    } else {
        return 1.0;
    }
}
vec4 colormap(float x) {
    return vec4(colormap_red(x), colormap_green(x), colormap_blue(x), 1.0);
}
float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}
float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    float res = mix(
        mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
        mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
    return res*res;
}
const mat2 mtx = mat2( 0.80,  0.60, -0.60,  0.80 );
float fbm( vec2 p )
{
    float f = 0.0;
    f += 0.500000*noise( p + uTime  ); p = mtx*p*2.02;
    f += 0.031250*noise( p ); p = mtx*p*2.01;
    f += 0.250000*noise( p ); p = mtx*p*2.03;
    f += 0.125000*noise( p ); p = mtx*p*2.01;
    f += 0.062500*noise( p ); p = mtx*p*2.04;
    f += 0.015625*noise( p + sin(uTime) );
    return f/0.96875;
}
float pattern( in vec2 p )
{
  return fbm( p + fbm( p + fbm( p ) ) );
}
  void main() {
    vUv = uv;
    vec3 pos = position;
    float shade = pattern(vUv);
    pos.z = shade*20.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);  
    }`,
    glsl`
    precision mediump float;
    uniform vec3 uColor;
    varying vec2 vUv;
    uniform float uTime;
    float colormap_red(float x) {
        if (x < 0.0) {
            return 54.0 / 255.0;
        } else if (x < 20049.0 / 82979.0) {
            return (829.79 * x + 54.51) / 255.0;
        } else {
            return 1.0;
        }
    }
    
    float colormap_green(float x) {
        if (x < 20049.0 / 82979.0) {
            return 0.0;
        } else if (x < 327013.0 / 810990.0) {
            return (8546482679670.0 / 10875673217.0 * x - 2064961390770.0 / 10875673217.0) / 255.0;
        } else if (x <= 1.0) {
            return (103806720.0 / 483977.0 * x + 19607415.0 / 483977.0) / 255.0;
        } else {
            return 1.0;
        }
    }
    
    float colormap_blue(float x) {
        if (x < 0.0) {
            return 54.0 / 255.0;
        } else if (x < 7249.0 / 82979.0) {
            return (829.79 * x + 54.51) / 255.0;
        } else if (x < 20049.0 / 82979.0) {
            return 127.0 / 255.0;
        } else if (x < 327013.0 / 810990.0) {
            return (792.02249341361393720147485376583 * x - 64.364790735602331034989206222672) / 255.0;
        } else {
            return 1.0;
        }
    }
  
  vec4 colormap(float x) {
      return vec4(colormap_red(x)+3.0, colormap_green(x), colormap_blue(x), 1.0);
  }
  
  
  
  float rand(vec2 n) { 
      return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }
  
  float noise(vec2 p){
      vec2 ip = floor(p);
      vec2 u = fract(p);
      u = u*u*(3.0-2.0*u);
  
      float res = mix(
          mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
          mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
      return res*res;
  }
  
  const mat2 mtx = mat2( 0.80,  0.60, -0.60,  0.80 );
  
  float fbm( vec2 p )
  {
      float f = 0.0;
  
      f += 0.500000*noise( p + uTime  ); p = mtx*p*2.02;
      f += 0.031250*noise( p ); p = mtx*p*2.01;
      f += 0.250000*noise( p ); p = mtx*p*2.03;
      f += 0.125000*noise( p ); p = mtx*p*2.01;
      f += 0.062500*noise( p ); p = mtx*p*2.04;
      f += 0.015625*noise( p + sin(uTime) );
  
      return f/0.96875;
  }
  
  float pattern( in vec2 p )
  {
    return fbm( p + fbm( p + fbm( p ) ) );
  }
  
  void main()
  {
    float shade = pattern(vUv);
    gl_FragColor = vec4(colormap(shade).rgb, shade);
  }
  `
  ),
});

function Rig({ children }) {
  const ref = useRef();
  const vec = new THREE.Vector3();
  const { camera, mouse } = useThree();
  useFrame(() => {
    // camera.position.lerp(vec.set(mouse.x * 2, 2, 5.5), 0.05);
    // ref.current.position.lerp(vec.set(mouse.x * 1, mouse.y * 0.1, 0), 0.1);
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
