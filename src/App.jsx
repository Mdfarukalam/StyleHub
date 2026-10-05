import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Men_cloths from './Pages/Men_cloths';
import Home from './Pages/Home';
import Women_sare from "./Pages/Women_sare";
import Kids_cloths from "./Pages/Kids_cloths";

function App() {
 
  return (
  <BrowserRouter>
  
  <Routes>
    
        <Route path="/" element={<Home />} />
                <Route path='/Home' element={<Home/>}>home</Route>
        <Route path='/men' element={<Men_cloths/>}>home</Route>
     <Route path='/women' element={<Women_sare/>}>home</Route>
          <Route path='/kids' element={<Kids_cloths/>}>home</Route>
  </Routes>
  </BrowserRouter>
 
   
  )
}

export default App
