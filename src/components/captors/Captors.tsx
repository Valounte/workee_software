/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Grid } from "../../ui-kit";
import http from "../../utils/http/httpService";
import { HumCaptor } from "./HumCaptor/HumCaptor";
import { TempCaptor } from "./TempCaptor/TempCaptor"
import "./Captors.css";
import { LumCaptor } from "./LumCaptor/LumCaptor";
import { SoundCaptor } from "./SoundCaptor/SoundCaptor";
import { useSelector } from "react-redux";

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
    const preferences = useSelector((state: any) => {
        return state.notification.preferences;
    });
    useEffect(() => {
        setTempData(preferences.TEMPERATURE);
    }, [preferences]);

    const [temp, setTemp] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [luminosity, setLuminosity] = useState(0);
    const [sound, setSound] = useState(0);
    const [tempData, setTempData] = useState(true);

    const bindEvents = () => {
        var win = window as any;

        win.api.getTemperatureHumitidy((event: any, value: ITempHumCaptor) => {
            if (localStorage.getItem("token")) {
                // console.log(preferencesData);
                if (value.temperature) {
                    localStorage.setItem("temperature", value.temperature.toString());
                    setTemp(value.temperature);
                    if (tempData) {
                        http.post("/temperature", {value: value.temperature});
                    }
                } if (value.humidity) {
                    localStorage.setItem("humidity", value.humidity.toString());
                    if (tempData) {
                        http.post("/humidity", {value: value.humidity});
                    }
                    setHumidity(value.humidity);
                } if (value.luminosity) {
                    localStorage.setItem("luminosity", value.luminosity.toString());
                    setLuminosity(value.luminosity);
                    if (tempData) {
                        http.post("/luminosity", {value: value.luminosity});
                    }
                } if (value.sound) {
                    localStorage.setItem("sound", value.sound.toString());
                    setSound(value.sound);
                    if (tempData) {
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
        </div>
    )
}