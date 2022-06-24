import React from 'react';

import './App.css';
import { Routes, Route } from "react-router-dom";
import Loading from './components/loading/Loading';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={< Loading/>} />
      </Routes>
    </div>
  );
}

export default App;
