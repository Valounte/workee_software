import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button/Button";
import './Configuration.css';
import Wifi from "./wifi/Wifi";

function Configuration() {
    const [state, setState] = useState(-1);
    const navigate = useNavigate();
    const nextState = () => {
        setState(state + 1);
        if (state === 0) {
            navigate("/w/home");
        }
    }

    const undoState = () => {
        setState(state - 1);
    }

    switch (state) {
        case 0:
            return (
                <Wifi undoState={undoState} nextState={nextState} />
            );
        default:
            return (
                <div>
                    <div className="container-fluid text-center">
                        <div className="h1">Configuration</div>
                        <p>Pour utiliser Workee, vous avez besoin de configurer votre appareil.</p>
                        <p>Cliquez sur "Commencer" pour démarrer la configuration.</p>
                        <Button click={nextState} type="workee">Configurer</Button>
                    </div>
                </div>
            );
    }
}

export default Configuration;