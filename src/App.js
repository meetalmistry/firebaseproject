import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";
import About from './pages/About';
import AddEdit from './pages/AddEdit';
import Homepage from './pages/Homepage';
import View from './pages/View';

import Header from './components/Header';

function App() {  
  return (
  <Router>   
    <Header/>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/add" element={<AddEdit/>}/>
      <Route path="/update/:id" element={<AddEdit/>}/>
      <Route path="/view/:id" element={<View/>}/>
      <Route path="/about" element={<About/>}/>
    </Routes>
  </Router>);
}

export default App;
