import React, { useEffect, useState } from "react";
import './Configuration.css';

function Configuration() {
    return (
        <div>
            <div className="container-fluid text-center">
                <div className="h1">Configuration</div>
                <p>Pour utiliser Workee, vous avez besoin de configurer votre appareil.</p>
                <p>Cliquez sur "Commencer" pour démarrer la configuration.</p>
            </div>
        </div>
    );
}

export default Configuration;