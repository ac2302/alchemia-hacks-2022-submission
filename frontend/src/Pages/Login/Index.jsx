import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import {
  MeshReflectorMaterial,
  Environment,
  shaderMaterial,
  OrbitControls,
  CameraShake,
  ScrollControls,
  Scroll,
} from "@react-three/drei";
import { MainContainer } from "../Home/Index"
import Stars from "../../Component/Stars/Stars";
import Login from "../../Component/Login/Login";

export default function LoginPage(){
    return(
        <MainContainer>
        <Canvas>
          <color attach="background" args={["#191920"]} />
          <fog attach="fog" args={["#191920", 0, 15]} />
          <Environment preset="city" />
          <ScrollControls pages={0}>
            <Scroll>
                <Stars/>
            </Scroll>
            <Scroll html>
                <Login/>
            </Scroll>
          </ScrollControls>
        </Canvas>
        </MainContainer>
    )
}