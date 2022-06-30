import React from 'react';

import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Loading from './components/loading/Loading';
import Home from './components/home/Home';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={< Loading/>} />
        <Route path="/home" element={< Home/>} />
      </Routes>
    </div>
  );
}

export default App;
