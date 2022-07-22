import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Logo from '../../../assets/logo/logo-workee.png';
import WifiOff from '../../../assets/wifi/wifi_off.png';
import './NavBar.css';

function NavBar() {
    const [dateNow, setDateNow] = useState("");
    const wifi = useSelector((state: any) => {
        return state.wifi;
    });
    useEffect(() => {
        init();
    }, []);

    const getDate = () => {
        let date = new Date();
        let hour = (date.getHours() < 10 ? '0' : '') + date.getHours();
        let minute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        return `${hour}:${minute}`;
    }

    const init = () => {
        setDateNow(getDate());
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
                            <img src={WifiOff} alt="" className="d-inline-block align-text-top wifi"/>
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