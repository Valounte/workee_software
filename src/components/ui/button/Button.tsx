import { useEffect, useState } from 'react';
import './Button.css';

export const Button = (props: any) => {
    let [style, setStyle] = useState("");
    useEffect (() => {
        switch (props.type) {
            case "workee":
                setStyle("btn btn-workee");
                break;
            case 'primary':
                setStyle("btn btn-primary");
                break;
            case 'secondary':
                setStyle("btn btn-secondary");
                break;
            case 'success':
                setStyle("btn btn-success");
                break;
            case 'danger':
                setStyle("btn btn-danger");
                break;
            case 'warning':
                setStyle("btn btn-warning");
                break;
            case 'info':
                setStyle("btn btn-info");
                break;
            case 'light':
                setStyle("btn btn-light");
                break;
            case 'dark':
                setStyle("btn btn-dark");
                break;
            default:
                setStyle("btn btn-primary");
                break;
        }
    }, [props.type]);

    return (
        <button {...props} onClick={props.click} type="button" className={style + " " + props.className}>{props.children}</button>
    )
}