
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setWifi } from "../../../../store";
import { Button } from "../../../ui/button/Button";
import { Input } from "../../../ui/input/Input";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Wifi.css';

function Wifi(props: any) {
    
    const [wifiList, setWifiList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ssid, setSSID] = useState("");
    const [password, setPassword] = useState("");
    const [wifiConnectLoading, setWifiConnectLoading] = useState(false);
    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
      selectSSID(panel);
    };

    useEffect(() => {
        getWifiList();
    }, []);
    useEffect(() => {
        renderHtmlWifi();
    }, [loading]);

    const connectWifi = async () => {
        var win = window as any;
        setWifiConnectLoading(true);
        let isConnected = await win.api.connectWifi({
            ssid: ssid,
            password: password
        });
        setWifiConnectLoading(false);
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

    const renderHtmlWifi = async () => {
    }
    return (
        <div className={props}>
            <div className="container-fluid text-center"><br/>
                <div className="">
                    <div className="accordion wifiList window" id="accordion">
                        {loading &&
                            <h2>Recherche WiFi <i className="fa-solid fa-circle-notch fa-spin"></i></h2>
                        }
                        {!loading &&
                        wifiList.map((wifi: any) =>
                        <div>
                            <Accordion disableGutters expanded={expanded === wifi.ssid} onChange={handleChange(wifi.ssid)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                            <Typography>
                                <span className="wifi-item-ssid">{wifi.ssid} {wifi.signal} dB</span>
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                                <div className="row">
                                    <label className="col-6">
                                        <Input id={wifi.ssid} label={"Clé de sécurité " + wifi.flags} setCustom={setPassword} value={password} onChange={onChangePassword} type="password" name="password" />
                                    </label>
                                    <div className="col-6">
                                            <Button disabled={password.length < 5} className="test" click={connectWifi} type="workee">
                                                {wifiConnectLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : "Connexion"}
                                            </Button>
                                    </div>
                                </div>
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <br/>
                        </div>
                
                        )}
                    </div>
                </div>
                <hr/>
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