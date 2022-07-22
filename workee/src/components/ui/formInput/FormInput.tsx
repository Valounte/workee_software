import { useEffect, useState } from 'react';
import './FormInput.css';

export const FormInput = (props: any) => {
    let [style, setStyle] = useState("");
    useEffect (() => {
        switch (props.type) {
            case "Email":
                setStyle("input input-email");
                break;
            case 'Password':
                setStyle("input input-passwd");
                break;
        }
    });

    return (
        <input onClick={props.click} type={props.type} placeholder={props.type} className={style}>{props.children}</input>
    )
}