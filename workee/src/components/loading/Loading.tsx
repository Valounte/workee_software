import React from "react";
import Logo from '../../assets/logo/logo-workee.png';
import './Loading.css';

function Loading() {
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