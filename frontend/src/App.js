
import './App.css';

import Home from './Pages/Home/Index';
import Navbar from './Component/Navbar/Navbar';
import LoginPage from './Pages/Login/Index';
import SignupPage from './Pages/Signup/Index';
import Model from './Pages/Model/Index'
import Shaders from './Pages/Shaders/shaders';
import PriceCard from './Component/PricingCard/PriceCard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import ModelScene from './Component/Model/Index';
import ShaderModel from './Component/Shader/Shader';

function App() {
  return (
    <Router>
    <Navbar/>
    <Routes>
     <Route exact path="/" element={<Home/>} />
     <Route exact path="/login" element={<LoginPage/>} />
     <Route exact path="/PriceCard" element={<PriceCard/>} />
     <Route exact path="/signup" element={<SignupPage/>} />
     <Route exact path="/shader" element={<Shaders/>} />
     <Route exact path="/model" element={<Model/>} />
     <Route exact path="/3D" element={<ModelScene/>}/>
     <Route exact path="/sh" element={<ShaderModel/>}/>
    </Routes> 
    </Router>
  )

}

export default App;
