
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWifi } from "../../../../store";
import { Button } from "../../../ui/button/Button";
import './Wifi.css';

function Wifi(props: any) {
    
    const [wifiList, setWifiList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ssid, setSSID] = useState("");
    const [password, setPassword] = useState("");

    const wifi = useSelector((state: any) => {
        return state.wifi;
    });
    const dispatch = useDispatch();

    useEffect(() => {
        getWifiList();
    }, []);

    const connectWifi = async () => {
        var win = window as any;
        let isConnected = await win.api.connectWifi({
            ssid: ssid,
            password: password
        });
        if (isConnected) {
            dispatch(setWifi({
                ssid: ssid,
                connected: true
            }))
            props.nextState();
        }
    }

    const selectSSID = (ssid: string) => {
        setSSID(ssid);
        setPassword("");
    }

    const onChangePassword = (e: any) => {
        setPassword(e.target.value);
    }

    const getWifiList = async () => {
        var win = window as any;
        setWifiList(await win.api.getWifi());
        setLoading(false);
    }

    const renderHtmlWifi = () => {
        if (loading) {
            return (
                <h2>Recherche WiFi <i className="fa-solid fa-circle-notch fa-spin"></i></h2>
            );
        } else {
            const htmlWifi = wifiList.map((wifi: any) => 
                <div className="accordion-item" key={wifi.ssid}>
                    <h2 className="accordion-header" id="headTest">
                    <button onClick={() => selectSSID(wifi.ssid)} className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#" + wifi.ssid} aria-expanded="true" aria-controls="collapseOne">
                            <span className="wifi-item-ssid">{wifi.ssid} {wifi.signal} dB</span>
                        </button>
                    </h2>
                    <div id={wifi.ssid} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordion">
                        <div className="accordion-body row align-items-center">
                            <label className="col-6">
                                Clé de sécurité {wifi.flags} :<br/>
                                <input value={password} onChange={onChangePassword} type="password" name="password" />
                            </label>
                            <div className="col-6">
                                <Button disabled={password.length < 5} className="test" click={connectWifi} type="workee">Se connecter</Button>
                            </div>
                        </div>
                    </div>
                </div>
            );
            return (
                <div className="accordion" id="accordion">
                    {htmlWifi}
                </div>
            )
        }
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
                        <div className="col-12">
                            <Button click={props.undoState} type="workee">Retour</Button>
                        </div>
                        
                </footer>
            </div>
        </div>
    );
}

export default Wifi;