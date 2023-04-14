import { Step, StepLabel, Stepper } from "@mui/material";
import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../../login/Login";
import { Button } from "../../ui/button/Button";
import './Configuration.css';
import Wifi from "./wifi/Wifi";

const steps = ['Configuration', 'Wifi', 'Connexion'];

function Configuration() {
    const [state, setState] = useState(-1);
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = React.useState(0);
    const nextState = async () => {
        console.log(state);
        setActiveStep(activeStep + 1);
        setState(state + 1);
        if (state === 0) {
            let win = window as any;
            let token = await win.api.getData("token");
            if (token) {
                navigate("/w/home");
                return;
            }
        }
        if (state === 1) {
            navigate("/w/login");
        }
    }

    const init = async () => {
        var win = window as any;
        let wifi = await win.api.getData("wifi");
        if (wifi.ssid !== "") {
            navigate("/w/login");
            return;
        }

    }

    useEffect(() => {
        init();
    }, []);

    const undoState = () => {
        setState(state - 1);
        setActiveStep(activeStep - 1);
    }

    const getState = () => {
        switch (state) {
            case 0:
                return (
                    <div>
                        
                        <Wifi undoState={undoState} nextState={nextState} />
                    </div> 
                );
            case 1:
                return(
                    <div>
                        <Login />
                    </div>
                );
            default:
                return (
                    <div className="configuration">
                        <div className="container-fluid text-center">
                            <div className="h1">Configuration</div>
                            <p>Pour utiliser Workee, vous avez besoin de configurer votre appareil.</p>
                            <p>Cliquez sur "Commencer" pour démarrer la configuration.</p>
                            <Button click={nextState} type="workee">Commencer</Button>
                        </div>
                    </div>
                );
        }
    }

    return (
        <div className="stepDiv">
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                    optional?: React.ReactNode;
                } = {};
                return (
                    <Step key={label} {...stepProps}>
                    <StepLabel className="configSize" {...labelProps}>{label}</StepLabel>
                    </Step>
                );
                })}
        </Stepper>
            {getState()}
        </div>
    )
}

export default Configuration;