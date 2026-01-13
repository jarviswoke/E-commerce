import React from "react";
import './App.css';
import Home from "./pages/Home"; 
import Contact from "./pages/Contact"; 
import About from "./pages/About"; 
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./components/Layout";
import OurStore from "./pages/OurStore";

function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
              <Route path="/" element = {<Layout/>}>
                <Route index element = {<Home/>} />
                <Route path="about" element = {<About/>} />
                <Route path="contact" element = {<Contact/>} />
                <Route path="store" element = {<OurStore/>} />
              </Route>
            </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
