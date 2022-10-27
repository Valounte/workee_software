/* eslint-disable react-hooks/exhaustive-deps */
import { Card, CardActionArea, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { Typography } from "../../../ui-kit";
import { HumidityIcon } from "../../../ui-kit/icons/Metrics/Humidity";
import { ThermometerIcon } from "../../../ui-kit/icons/Metrics/Thermometer";
import "./HumCaptor.css";

interface IPropsTempHumCaptor {
    humidity: number;
}

export const HumCaptor = (props: IPropsTempHumCaptor) => {

    const [oldTemp, setOldTemp] = useState(0);
    const [tempType, setTempType] = useState(0);
    useEffect(() => {
        setTempType(props.humidity - oldTemp);
        setOldTemp(props.humidity);
    }, [props.humidity]);

    return (
        <div className="row">
            <Card className="cardCaptor" sx={{ maxWidth: 350, maxHeight: 200, width: 350 }}>
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
                                <span className="">{props.humidity} <span className="unitSensor">%</span></span>
                            </Typography>
                        </div>
                        <hr/>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}