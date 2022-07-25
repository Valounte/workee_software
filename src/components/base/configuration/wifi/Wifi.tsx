
import React, { useEffect, useState } from "react";
import { Button } from "../../../ui/button/Button";
import './Wifi.css';

function Wifi(props: any) {
    
    const [wifiList, setWifiList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getWifiList();
    }, []);

    const renderHtmlWifi = () => {
        if (loading) {
            return (
                <h2>Recherche WiFi <i className="fa-solid fa-circle-notch fa-spin"></i></h2>
            );
        } else {
            const htmlWifi = wifiList.map((wifi: any) => 
                <div className="wifi-item" key={wifi.ssid}>
                    <div className="wifi-item-ssid">{wifi.ssid}</div>
                    <div className="wifi-item-password">{wifi.password}</div>
                </div>
            );
            return (
               <div>{htmlWifi}</div> 
            )
        }
    }


    const getWifiList = async () => {
        var win = window as any;
        setWifiList(await win.api.getWifi());
        setLoading(false);
    }
    return (
        <div className={props}>
            <div className="container-fluid text-center">
                <div className="h1">Configuration du Wifi</div>
                <div className="container-fluid">
                    {
                        renderHtmlWifi()
                    }
                </div>
                <footer className="row footerConfig">
                        <div className="col-6">
                            <Button click={props.undoState} type="workee">Retour</Button>
                        </div>
                        <div className="col-6">
                            <Button click={props.nextState} type="workee">Suivant</Button>
                        </div>
                </footer>
            </div>
        </div>
    );
}

export default Wifi;