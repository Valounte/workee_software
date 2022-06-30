import React from "react";
import Logo from '../../assets/logo/logo-workee.png';
import { BaseDirectory, createDir, readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import './Home.css';

function Home() {

    return (
        <div className="background">
            <p>Salut</p>
        </div>
    );
}

export default Home;