import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Home.css';

function Home() {
    const [dateNow, setDateNow] = useState("");
    
    useEffect(() => {
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