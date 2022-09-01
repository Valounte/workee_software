import React, { useEffect } from "react";

import BellSolid from '../../../../assets/img/bell-solid.svg';

function Bell() {
    useEffect(() => { 
    }, []);
    
    return (
        <div>
            <img src={BellSolid} alt="" className="d-inline-block align-text-top wifi"/>
        </div>
    );
}

export default Bell;