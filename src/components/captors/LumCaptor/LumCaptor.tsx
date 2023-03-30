/* eslint-disable react-hooks/exhaustive-deps */
import { Card, CardActionArea, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { LuminosityIcon, Typography } from "../../../ui-kit";
import "./LumCaptor.css";

interface IPropsLumCaptor {
    luminosity: number;
}

export const LumCaptor = (props: IPropsLumCaptor) => {

    const [oldTemp, setOldTemp] = useState(0);
    const [tempType, setTempType] = useState(0);
    const [firstTemp, setFirstTemp] = useState(true);
    useEffect(() => {
        setTempType(props.luminosity - oldTemp);
        if (props.luminosity !== 0) {
            setFirstTemp(false);
        }
        setOldTemp(props.luminosity);
    }, [props.luminosity]);

    return (
        <div className="row">
            <Card className="cardCaptor" sx={{ maxWidth: 350, maxHeight: 200, width: 350 }}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5">
                            <LuminosityIcon className="iconSensor"/><span className="textTitleSensor">Luminosité</span>
                        </Typography>
                        <div>
                            <Typography className="tempIndicator">
                                {tempType > 0 && <span className="material-symbols-outlined  flecheUp">arrow_upward</span>}
                                {tempType < 0 && <span className="material-symbols-outlined  flecheDown">arrow_downward</span>}
                                {tempType === 0 && <span className="material-symbols-outlined remove">remove</span>}
                            </Typography>
                            <Typography className="temperatureNumber">
                                {!firstTemp && <span className="">{props.luminosity} <span className="unitSensor">lx</span></span>}
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