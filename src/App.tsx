import React, { useEffect, useState } from 'react';

import './App.css';
import { Routes, Route } from "react-router-dom";
import Loading from './components/loading/Loading';
import Base from './components/base/Base';
import Home from './components/home/Home';
import Configuration from './components/base/configuration/Configuration';
import Keyboard from "react-simple-keyboard"
import { useSelector } from 'react-redux';
import Login from './components/login/Login';
import axios from 'axios';
import { Notifications } from './components/notifications/Notifications';
import { Profile } from './components/profile/Profile';

axios.defaults.baseURL = "https://workee-back.brangers.eu/api";

function App() {
  const [keyboardInput, setKeyboardInput] = useState<any>();
  const [layout, setLayout] = useState<string>("default");

  const keyboard = useSelector((state: any) => {
    return state.keyboard;
  });
  useEffect(() => {
    if (keyboardInput) {
      keyboardInput.setInput(keyboard.props.value);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyboard, keyboardInput]);
  const onChange = (input: String) => {
    keyboardInput.setInput(input);
    keyboard.props.setCustom(input);
  }

  const onKeyPress = (button: String) => {
    if (button === "{shift}" || button === "{lock}") handleShift();
  }

  const handleShift = () => {
    setLayout(layout === "default" ? "shift" : "default");
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={< Loading/>} />
        <Route path="/w" element={< Base/>} >
          <Route path="home" element={<Home/>} />
          <Route path="config" element={<Configuration/>} />
          <Route path="login" element={<Login/>} />
          <Route path="profile" element={<Profile/>}/>
          <Route path="notifications" element={<Notifications/>} />
        </Route>
      </Routes>
      {keyboard.keyboardActivate && 
                <div className="keyboard">
                    <Keyboard layoutName={layout} keyboardRef={(r: any) => setKeyboardInput(r)} className="" onKeyPress={onKeyPress} onChange={onChange}/>
                </div>}
    </div>
  );
}

export default App;
