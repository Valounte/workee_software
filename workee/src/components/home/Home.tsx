import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Logo from '../../assets/logo/logo-workee.png';
import './Home.css';
import { emit, listen } from '@tauri-apps/api/event'

function Home() {
    const [dateNow, setDateNow] = useState("");
    const wifi = useSelector((state: any) => {
        return state.wifi;
    });
    useEffect(() => {
        emit('wifi-status-check', {
            message: 'Tauri is awesome!'
        })
        // listen('wifi-status', (data: any) => {
        //     console.log(data);
        // });
        init();
    }, []);

    const getDate = () => {
        let date = new Date();
        let hour = (date.getHours() < 10 ? '0' : '') + date.getHours();
        let minute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        let second = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
        console.log(`${hour}:${minute}:${second}`)
        return `${hour}:${minute}:${second}`;
    }

    const init = () => {
        setDateNow(getDate());
        setInterval(() => {
            setDateNow(getDate());
        }, 1000);
    }
    return (
        <div className="background-white">
            <nav className="navbar bg-workee">
                <div className="container-fluid">
                    <img src={Logo} alt="" className="d-inline-block align-text-top logoMenu"/>
                    <ul className="navbar-nav hour">
                    <li className="nav-item">
                        <span className="date">{dateNow}</span>
                    </li>
                    </ul>
                    <div className="navbar-brand">
                    </div>
                </div>
            </nav>
            <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-3 sphere">
                    <span className=""></span>
                </div>
                <div className="col-3 sphere">
                    <span></span>
                </div>
                <div className="col-3 sphere">
                    <span></span>
                </div>
                <div className="col-3 sphere">
                    <span></span>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-3 sphere">
                    <span className=""></span>
                </div>
                <div className="col-3 sphere">
                    <span></span>
                </div>
                <div className="col-3 sphere">
                    <span></span>
                </div>
                <div className="col-3 sphere">
                    <span></span>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-12">
                    <span className=""></span>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Home;