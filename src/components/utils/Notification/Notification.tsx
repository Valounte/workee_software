import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Config } from "../../../Config";
import { setMessage, setPreferences } from "../../../store/notificationStore";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export const Notification = (props: any) => {

    const url = useMemo(() => new URL(props.config.url), [props.config.url]);
    
    let eventSource = useRef<EventSource>();

    const dispatch = useDispatch();

    useEffect(() => {
        if (eventSource.current) {
            eventSource.current.close();
        }
        url.searchParams.append("topic", props.config.topic);
        eventSource.current = new EventSource(url);
        eventSource.current.onmessage = (event: MessageEvent) => {
            let data = JSON.parse(event.data);
            if (data.metricType) {
                dispatch(setPreferences({
                    metricType: data.metricType, 
                    enabled: !data.isDesactivated
                }));
            }
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