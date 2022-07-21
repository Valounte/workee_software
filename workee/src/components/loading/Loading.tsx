import React from "react";
import Logo from '../../assets/logo/logo-workee.png';
import { BaseDirectory, createDir, readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import './Loading.css';
import { useNavigate } from "react-router-dom";

function Loading() {
    const navigate = useNavigate();
    const createDataFolder = async () => {
        await createDir("data", {
            dir: BaseDirectory.Desktop,
            recursive: true,
        });
        createDataFile();
    };
    
    const createDataFile = async () => {
        try {
            await readTextFile(`./data/data.json`, {
                dir: BaseDirectory.Desktop,
            });
        } catch (e) {
            await writeTextFile({
                contents: "{}",
                path: `./data/data.json`,
            },{
                dir: BaseDirectory.Desktop,
            });
        }
        setTimeout(() => {
            navigate("/w/config");
        }, 5000)
    };

    const init = () => {
        createDataFolder();
    }


    init();

    return (
        <div className="background">
            <div className="Loading">
                <img className="logo" src={Logo}/>
                <div className="loading-text">
                    <i className="fa-solid fa-circle-notch fa-spin"></i>
                </div>
            </div>
        </div>
    );
}

export default Loading;