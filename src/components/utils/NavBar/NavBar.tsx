import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logo from '../../../assets/logo/logo-workee.png';
import WifiOff from '../../../assets/wifi/wifi_off.png';
import WifiOn from '../../../assets/wifi/wifi.png';
import './NavBar.css';
import Bell from "./Bell/Bell";
import { setTopic } from "../../../store/notificationStore";
import { Config } from "../../../Config";
import UserIcon from "./UserIcon/UserIcon";
import { useNavigate } from "react-router-dom";

function NavBar() {
    const [dateNow, setDateNow] = useState(""),
        [token, setToken] = useState(""),
        [ip, setIp] = useState(""),
        dispatch = useDispatch(),
        wifi = useSelector((state: any) => {
            return state.wifi;
        });
    const navigate = useNavigate();
    useEffect(() => {
        init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log(wifi);   
    }, [wifi]);
    const getToken = async () => {
        let win = window as any;
        let token = await win.api.getData("token");
        setIp(await win.api.getLocalIp("ip"));
        if (token) {
            token = token.split(" ")[1];
            setToken(token);
            return;
        }
        setToken("");
    }

    const getDate = () => {
        let date = new Date();
        let hour = (date.getHours() < 10 ? '0' : '') + date.getHours();
        let minute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        getToken();
        return `${hour}:${minute}`;
    }

    const returnHome = () => {
        if (token !== "") {
            navigate("/w/home")
        } 
    }

    const init = async () => {
        setDateNow(getDate());
        let win = window as any;
        let token = await win.api.getData("token");
        if (token) {
            token = token.split(" ")[1];
            setToken(token);
            await dispatch(setTopic(Config.mercure.topic + "notification/" + token));
            await dispatch(setTopic(Config.mercure.topic + "metrics-preferences/" + token));
            await dispatch(setTopic(Config.mercure.topic + "teaOrCoffee/" + token));
            await dispatch(setTopic(Config.mercure.topic + "feedback/" + token));

        }
        setInterval(() => {
            setDateNow(getDate());

        }, 1000);
        
    }
    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-workee">
                <div className="container-fluid">
                    <img onClick={returnHome} src={Logo} alt="" className="d-inline-block align-text-top logoMenu"/>
                    
                    <ul className="navbar-nav mr-auto">
                        {token !== "" &&
                        <li className="nav-item">
                            <UserIcon />
                        </li>}
                        <li className="nav-item">
                            {!wifi.connected === true &&
                                <img src={WifiOff} alt="" className="d-inline-block align-text-top wifi"/>
                            }
                            {wifi.connected === true &&
                                <img src={WifiOn} alt="" className="d-inline-block align-text-top wifi"/>
                            }
                            {ip}
                            
                        </li>
                        {token !== "" && <li className="nav-item">
                            <Bell/>
                        </li>}
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