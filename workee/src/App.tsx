import React from 'react';

import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Loading from './components/loading/Loading';
import Base from './components/base/Base';
import Home from './components/home/Home';
import Configuration from './components/base/configuration/Configuration';
import Login from './components/login/Login';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={< Login/>} />
        <Route path="/" element={< Loading/>} />
        <Route path="/w" element={< Base/>} >
          <Route path="test" element={<Home/>} />
          <Route path="config" element={<Configuration/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
