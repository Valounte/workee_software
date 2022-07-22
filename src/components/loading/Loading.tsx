import React from "react";
import Logo from '../../assets/logo/logo-workee.png';
import './Loading.css';
import { useNavigate } from "react-router-dom";

function Loading() {
    const navigate = useNavigate();

    
    const createDataFile = async () => {
        setTimeout(() => {
            navigate("/w/config");
        }, 5000)
    };

    const init = () => {
        createDataFile();
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