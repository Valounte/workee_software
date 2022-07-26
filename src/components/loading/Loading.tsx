import React from "react";
import Logo from '../../assets/logo/logo-workee.png';
import './Loading.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setWifi } from "../../store";
function Loading() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const createDataFile = async () => {
        setTimeout(async () => {
            var win = window as any;
            let wifi = await win.api.getData("wifi");
            if (wifi) {
                dispatch(setWifi({
                    ssid: wifi.ssid,
                    connected: true
                }));
            }
            if (await win.api.getData("ready")) {
                navigate("/w/home");
            } else {
                navigate("/w/config");
            }
        }, 5000)
    };

    const init = async () => {
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