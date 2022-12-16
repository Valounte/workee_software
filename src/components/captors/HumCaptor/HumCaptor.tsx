/* eslint-disable react-hooks/exhaustive-deps */
import { Card, CardActionArea, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { Typography } from "../../../ui-kit";
import { HumidityIcon } from "../../../ui-kit/icons/Metrics/Humidity";
import "./HumCaptor.css";

interface IPropsTempHumCaptor {
    humidity: number;
}

export const HumCaptor = (props: IPropsTempHumCaptor) => {

    const [oldTemp, setOldTemp] = useState(0);
    const [tempType, setTempType] = useState(0);
    const [firstTemp, setFirstTemp] = useState(true);
    useEffect(() => {
        setTempType(props.humidity - oldTemp);
        if (props.humidity !== 0) {
            setFirstTemp(false);
        }
        setOldTemp(props.humidity);
    }, [props.humidity]);

    return (
        <div className="row">
            <Card className="cardCaptor" sx={{ maxWidth: 350, maxHeight: 200, width: 350}}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5">
                            <HumidityIcon className="iconSensor"/><span className="textTitleSensor">Humidité</span>
                        </Typography>
                        <div>
                            <Typography className="tempIndicator">
                                {tempType > 0 && <span className="material-symbols-outlined  flecheUp">arrow_upward</span>}
                                {tempType < 0 && <span className="material-symbols-outlined  flecheDown">arrow_downward</span>}
                                {tempType === 0 && <span className="material-symbols-outlined remove">remove</span>}
                            </Typography>
                            <Typography className="temperatureNumber">
                            {!firstTemp && <span className="">{props.humidity} <span className="unitSensor">%</span></span>}
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