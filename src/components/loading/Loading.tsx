import React from "react";
import Logo from '../../assets/logo/logo-workee.png';
import './Loading.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setWifi } from "../../store";
import http from "../../utils/http/httpService";
function Loading() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const createJob = async () => {
        const cronList = await http.get("/daily-feedback-preferences", "");
        var win = window as any;

        for (let i = 0; i < cronList.length; i++) {
            const element = cronList[i];
            const cron = element.cronjobTime;
            const id = element.teamId;
            await win.api.createFeedBack({ cron, id });
        }
    };

    const createDataFile = async () => {
        setTimeout(async () => {
            var win = window as any;
            let wifi = await win.api.getData("wifi");
            let token = await win.api.getData("token");
            if (wifi) {
                dispatch(setWifi({
                    ssid: wifi.ssid,
                    connected: true
                }));
            }
            if (wifi && token) {
                localStorage.setItem("token", token);
                createJob();
                http.stockMetrics();
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
                <img alt="logo" className="logo" src={Logo}/>
                <div className="loading-text">
                    <i className="fa-solid fa-circle-notch fa-spin"></i>
                </div>
            </div>
        </div>
    );
}

export default Loading;