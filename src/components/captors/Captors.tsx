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
}

export const Captors = () => {
    useEffect(() => {
        init();
    }, []);

    const [temp, setTemp] = useState(0);
    const [humidity, setHumidity] = useState(0);

    const bindEvents = () => {
        var win = window as any;

        win.api.getTemperatureHumitidy((event: any, value: ITempHumCaptor) => {
            if (value.temperature && localStorage.getItem("token")) {
                setTemp(value.temperature);
                setHumidity(value.humidity);
                http.post("/temperature", {value: value.temperature});
                http.post("/humidity", {value: value.humidity});
            }
        });
    };

    const init = async () => {
        bindEvents();
        var test = await http.get("/current_temperature", "");
        console.log(test);
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
                    <LumCaptor luminosity={0}/>
                </Grid>
                <Grid alignItems="center" item>
                    <SoundCaptor sound={0}/>
                </Grid>
            </Grid>
        </div>
    )
}