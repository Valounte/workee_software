import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logo from '../../../assets/logo/logo-workee.png';
import WifiOff from '../../../assets/wifi/wifi_off.png';
import WifiOn from '../../../assets/wifi/wifi.png';
import './NavBar.css';
import Bell from "./Bell/Bell";
import { setTopic } from "../../../store/notificationStore";
import { Config } from "../../../Config";

function NavBar() {
    const [dateNow, setDateNow] = useState(""),
        dispatch = useDispatch(),
        wifi = useSelector((state: any) => {
            return state.wifi;
        });
    
    useEffect(() => {
        init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log(wifi);   
    }, [wifi]);
    const getDate = () => {
        let date = new Date();
        let hour = (date.getHours() < 10 ? '0' : '') + date.getHours();
        let minute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        return `${hour}:${minute}`;
    }

    const init = async () => {
        setDateNow(getDate());
        let win = window as any;
        let token = await win.api.getData("token");
        if (token) {
            token = token.split(" ")[1];
            dispatch(setTopic(Config.mercure.topic + "/" + token));
        }
        setInterval(() => {
            setDateNow(getDate());
        }, 1000);
        
    }
    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-workee">
                <div className="container-fluid">
                    <img src={Logo} alt="" className="d-inline-block align-text-top logoMenu"/>
                    
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            {!wifi.connected === true &&
                                <img src={WifiOff} alt="" className="d-inline-block align-text-top wifi"/>
                            }
                            {wifi.connected === true &&
                                <img src={WifiOn} alt="" className="d-inline-block align-text-top wifi"/>
                            }
                            
                        </li>
                        <li className="nav-item">
                        <Bell/>
                        </li>
                        <li className="nav-item">
                            <span className="date">{dateNow}</span>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;