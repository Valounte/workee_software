import { emit } from "@tauri-apps/api/event";
import React, { useEffect, useState } from "react";
import { Button } from "../../../ui/button/Button";
import './Wifi.css';

function Wifi(props: any) {
    useEffect(() => {
        console.log('i fire once');
        emit('scan-wifi', {
            message: 'Tauri is awesome!'
        });
    }, []);
    return (
        <div className={props}>
            <div className="container-fluid text-center">
                <div className="h1">Configuration du Wifi</div>
                <footer className="row footerConfig">
                        <div className="col-6">
                            <Button click={props.undoState} type="workee">Retour</Button>
                        </div>
                        <div className="col-6">
                            <Button click={props.nextState} type="workee">Suivant</Button>
                        </div>
                </footer>
            </div>
        </div>
    );
}

export default Wifi;