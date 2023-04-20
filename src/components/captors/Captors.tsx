/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Grid } from "../../ui-kit";
import http from "../../utils/http/httpService";
import { HumCaptor } from "./HumCaptor/HumCaptor";
import { TempCaptor } from "./TempCaptor/TempCaptor"
import "./Captors.css";
import { LumCaptor } from "./LumCaptor/LumCaptor";
import { SoundCaptor } from "./SoundCaptor/SoundCaptor";

interface ITempHumCaptor {
    temperature: number;
    humidity: number;
    luminosity: number;
    sound: number;
}

export const Captors = () => {
    useEffect(() => {
        init();
    }, []);

    const [temp, setTemp] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [luminosity, setLuminosity] = useState(0);
    const [sound, setSound] = useState(0);
    const [ip, setIp] = useState("IP");

    const bindEvents = () => {
        var win = window as any;

        setInterval(async () => {
            setIp(await win.api.getLocalIp("ip") || "IP");
        }, 1000);

        win.api.getTemperatureHumitidy((event: any, value: ITempHumCaptor) => {
            if (localStorage.getItem("token")) {
                let data: any = localStorage.getItem("metrics") || {};
                try {
                    data = JSON.parse(data);
                } catch (e) {
                    data = {};
                }
                if (value.temperature) {

                    localStorage.setItem("temperature", value.temperature.toString());
                    setTemp(value.temperature);
                    if (data.TEMPERATURE) {
                        http.post("/temperature", {value: value.temperature});
                    }
                } if (value.humidity) {
                    localStorage.setItem("humidity", value.humidity.toString());
                    if (data.HUMIDITY) {
                        http.post("/humidity", {value: value.humidity});
                    }
                    setHumidity(value.humidity);
                } if (value.luminosity) {
                    localStorage.setItem("luminosity", value.luminosity.toString());
                    setLuminosity(value.luminosity);
                    if (data.LUMINOSITY) {
                        http.post("/luminosity", {value: value.luminosity});
                    }
                } if (value.sound) {
                    localStorage.setItem("sound", value.sound.toString());
                    setSound(value.sound);
                    if (data.SOUND) {
                        http.post("/sound", {value: value.sound});
                    }
                }
            }
        });
    };

    const init = async () => {
        bindEvents();
        setTemp(Number(localStorage.getItem("temperature")));
        setHumidity(Number(localStorage.getItem("humidity")));
        setLuminosity(Number(localStorage.getItem("luminosity")));
        setSound(Number(localStorage.getItem("sound")));
        setInterval(() => {
        }, 1000);
    }
    return (
        <div className="backgroundHome">
            <Grid container display="flex" justifyContent="center" alignItems="center"  spacing={5}>
                <Grid alignItems="center" item>
                    <TempCaptor temperature={temp}/>
                </Grid>
                <Grid alignItems="center" item>
                    <HumCaptor humidity={humidity}/>
                </Grid>
            </Grid>
            <Grid container display="flex" justifyContent="center" alignItems="center"  spacing={5}>
                <Grid alignItems="center" item>
                    <LumCaptor luminosity={luminosity}/>
                </Grid>
                <Grid alignItems="center" item>
                    <SoundCaptor sound={sound}/>
                </Grid>
            </Grid>
            <span className="ipPrint">{ip}</span>
        </div>
    )
}