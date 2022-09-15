import React, { useEffect } from "react";
import './Home.css';

function Home() {

    useEffect(() => {
        init();
    }, []);


    const init = () => {
        var win = window as any;
        win.api.getTemperatureHumitidy((event: any, value: any) => {
            alert(value);
        });
        setInterval(() => {
        }, 1000);
    }
    return (
            <div className="background-white">
                <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-3 sphere">
                        <span className=""></span>
                    </div>
                    <div className="col-3 sphere">
                        <span></span>
                    </div>
                    <div className="col-3 sphere">
                        <span></span>
                    </div>
                    <div className="col-3 sphere">
                        <span></span>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-3 sphere">
                        <span className=""></span>
                    </div>
                    <div className="col-3 sphere">
                        <span></span>
                    </div>
                    <div className="col-3 sphere">
                        <span></span>
                    </div>
                    <div className="col-3 sphere">
                        <span></span>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12">
                        <span className=""></span>
                    </div>
                </div>
                </div>
            </div>
    );
}

export default Home;