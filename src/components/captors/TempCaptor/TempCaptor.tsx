/* eslint-disable react-hooks/exhaustive-deps */
import { Card, CardActionArea, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { Typography } from "../../../ui-kit";
import { ThermometerIcon } from "../../../ui-kit/icons/Metrics/Thermometer";
import "./TempCaptor.css";

interface IPropsTempHumCaptor {
    temperature: number;
}

export const TempCaptor = (props: IPropsTempHumCaptor) => {

    const [oldTemp, setOldTemp] = useState(0);
    const [tempType, setTempType] = useState(0);
    useEffect(() => {
        setTempType(props.temperature - oldTemp);
        setOldTemp(props.temperature);
    }, [props.temperature]);

    return (
        <div className="row">
            <Card className="cardCaptor" sx={{ maxWidth: 350, maxHeight: 200, width: 350 }}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5">
                            <ThermometerIcon className="iconSensor"/><span className="textTitleSensor">Température</span>
                        </Typography>
                        <div>
                            <Typography className="tempIndicator">
                                {tempType > 0 && <span className="material-symbols-outlined  flecheUp">arrow_upward</span>}
                                {tempType < 0 && <span className="material-symbols-outlined  flecheDown">arrow_downward</span>}
                                {tempType === 0 && <span className="material-symbols-outlined remove">remove</span>}
                            </Typography>
                            <Typography className="temperatureNumber">
                                <span className="">{props.temperature} <span className="unitSensor">°C</span></span>
                            </Typography>
                        </div>
                        <hr/>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}