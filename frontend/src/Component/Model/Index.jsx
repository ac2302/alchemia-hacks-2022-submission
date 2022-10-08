import { Canvas } from "@react-three/fiber"
import { Watch } from "./model"
import { useGLTF, PresentationControls, Environment, ContactShadows, Scroll, ScrollControls, OrbitControls } from '@react-three/drei'
import styled from 'styled-components';
import '../PricingCard/pricecard.css';
export default function ModelScene() {
  console.log(OrbitControls)
  return (
    <ModelContainer>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow />
        <OrbitControls />
        <Watch rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.25, 0]} scale={0.003} />
        <ScrollControls pages={0}>
          <Scroll html>

            <div className="CardPricing" ></div>
            <div className='price-card'>
              <div className='name' >Name</div>
              <div className='price' >Price</div>
            </div>

            <div className='disc'>
              <div className='title' >Discription</div>
              <div className='text' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam illo fugiat ut mollitia esse incidunt deleniti, voluptat.</div>
            </div>
          </Scroll>
        </ScrollControls>
        <ContactShadows position={[0, -1.4, 0]} opacity={0.75} scale={10} blur={2.5} far={4} />
        <Environment preset="city" />
      </Canvas>
    </ModelContainer>
  )
}

const ModelContainer = styled.div`
    height:100vh ;
    width:100vw ;
`

