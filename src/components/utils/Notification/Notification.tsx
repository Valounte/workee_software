import { useEffect, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import { Config } from "../../../Config";
import { setMessage } from "../../../store/notificationStore";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export const Notification = (props: any) => {

    const url = useMemo(() => new URL(props.config.url), [props.config.url]);

    let eventSource = useRef<EventSource>();

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(props.config.topic)
        if (eventSource.current) {
            eventSource.current.close();
        }
        if (Config.mercure.fakeJwt) {
            url.searchParams.append("topic", props.config.topic);
        } else {
            url.searchParams.append("topic", props.config.topic);
        }
        eventSource.current = new EventSource(url);
        eventSource.current.onmessage = (event: MessageEvent) => {
            let data = JSON.parse(event.data);
            dispatch(setMessage(data))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.config.topic, url]);

    return (
        <div>
            {props.children}
            <ToastContainer className="notif" />
        </div>
        );
};