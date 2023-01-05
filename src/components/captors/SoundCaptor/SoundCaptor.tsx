/* eslint-disable react-hooks/exhaustive-deps */
import { Card, CardActionArea, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import {SoundIcon, Typography } from "../../../ui-kit";
import "./SoundCaptor.css";

interface IPropsSoundCaptor {
    sound: number;
}

export const SoundCaptor = (props: IPropsSoundCaptor) => {

    const [oldTemp, setOldTemp] = useState(0);
    const [tempType, setTempType] = useState(0);
    const [firstTemp, setFirstTemp] = useState(true);
    useEffect(() => {
        setTempType(props.sound - oldTemp);
        if (props.sound !== 0) {
            setFirstTemp(false);
        }
        setOldTemp(props.sound);
    }, [props.sound]);

    return (
        <div className="row">
            <Card className="cardCaptor" sx={{ maxWidth: 350, maxHeight: 200, width: 350 }}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5">
                            <SoundIcon className="iconSensor"/><span className="textTitleSensor">Son</span>
                        </Typography>
                        <div>
                            <Typography className="tempIndicator">
                                {tempType > 0 && <span className="material-symbols-outlined  flecheUp">arrow_upward</span>}
                                {tempType < 0 && <span className="material-symbols-outlined  flecheDown">arrow_downward</span>}
                                {tempType === 0 && <span className="material-symbols-outlined remove">remove</span>}
                            </Typography>
                            <Typography className="temperatureNumber">
                                {!firstTemp && <span className="">{props.sound} <span className="unitSensor">dB</span></span>}
                                {firstTemp && <span className="h5">Pas de donnée</span>}
                            </Typography>
                        </div>
                        <hr/>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}