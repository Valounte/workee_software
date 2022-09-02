/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Bell.css';
import { toast } from 'react-toastify';
import $ from 'jquery';
import { setMessage } from "../../../../store/notificationStore";

const Message = (props: any) => {
    return (<div>
        <div className={"information-toast " + props.icon}>
            <span className="material-icons icon-toast">{props.icon}</span>
            <span>Messages ⸱ <span className="toast-class">{props.classType}</span></span>
        </div>
        <div className="message-toast-user">
            <span>{props.message.firstname} {props.message.lastname}</span>
        </div>
        <div className="message-toast">
            <span>{props.message.message}</span>
        </div>
    </div>)
}


function Bell() {
    const message = useSelector((state: any) => {
        return state.notification.message;
    });
    const [counter, setCounter] = useState<Number[]>([]),
        dispatch = useDispatch(),
        [animation, setAnimation] = useState(false);

    const counterCheck = () => {
        let type;
        let icon: string;
        let classType: string;
        if (counter.length > 0 && message.alertLevel) {
            $('#layer1').removeClass('material-symbols-outlined');
            $('#layer2').removeClass('material-symbols-outlined');
            $('#layer3').removeClass('material-symbols-outlined');
            $('#layer1').addClass('material-icons');
            $('#layer2').addClass('material-icons');
            $('#layer3').addClass('material-icons');
            if (animation === false) {
                setAnimation(true);
                $('#layer1').addClass('animation-1');
                $('#layer2').addClass('animation-2');
                $('#layer3').addClass('animation-3');
                setTimeout(() => {
                    $('#layer1').removeClass('animation-1');
                    $('#layer2').removeClass('animation-2');
                    $('#layer3').removeClass('animation-3');
                    setAnimation(false);
                }, 1000);
            }
            switch(message.alertLevel) {
                case "URGENT_ALERT":
                    type = toast.TYPE.ERROR;
                    icon = "report";
                    classType = "Urgent";
                    break;
                case "IMPORTANT_ALERT":
                    type = toast.TYPE.WARNING;
                    icon = "warning";
                    classType = "Important";
                    break;
                case "NORMAL_ALERT":
                    type = toast.TYPE.INFO;
                    icon = "chat";
                    classType = "Information";
                    break;
                default:
                    type = toast.TYPE.INFO;
                    icon = "chat";
                    classType = "Information";
                    break;

            }
            toast(<Message icon={icon} message={message} classType={classType}/>, {
                position: toast.POSITION.TOP_RIGHT,
                theme: "light",
                icon: false,
                type: type,
                onClose: () => {
                    dispatch(setMessage(null));
                }
            });
        } else {
            $('#layer1').addClass('material-symbols-outlined');
            $('#layer2').addClass('material-symbols-outlined');
            $('#layer3').addClass('material-symbols-outlined');
            $('#layer1').removeClass('material-icons');
            $('#layer2').removeClass('material-icons');
            $('#layer3').removeClass('material-icons');
        }
    }

    useEffect(() => {    
    }, []);
    useEffect(() => {
        counterCheck();
    }, [counter]);

    useEffect(() => {
        console.log(message);
        if (message) {
            let counterOld = [...counter];
            counterOld.push(message.notificationId);
            setCounter(counterOld);
        }
    }, [message]);
    
    return (
        <div>
            {counter.length > 0 &&
                <div className="div-counter">
                    <span className="pastille">{counter.length}</span>
                </div>
            }
            <div className="bell" id="bell">
                <div id="layer1" className="anchor material-symbols-outlined layer-1">notifications_active</div>
                <div id="layer2" className="anchor material-symbols-outlined layer-2">notifications</div>
                <div id="layer3" className="anchor material-symbols-outlined layer-3">notifications</div>
            </div>
        </div>
    );
}

export default Bell;