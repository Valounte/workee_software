import { useEffect, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import { setMessage } from "../../../store/notificationStore";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EventsUtils from "../../../utils/events";

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
            switch (data.type) {
                case "TeaOrCoffee":
                    EventsUtils.dispatch("TeaOrCoffee", data);
                    return;
                case "feedback": {
                    EventsUtils.dispatch("feedback", data);
                    return;
                }
                default:
                    break;
            }
            if (data.metricType) {
                let metrics = localStorage.getItem("metrics");
                if (metrics) {
                    let metricsJson = JSON.parse(metrics);
                    metricsJson[data.metricType] = !data.isDesactivated;
                    localStorage.setItem("metrics", JSON.stringify(metricsJson));
                } else {
                    let metricsJson: any = {};
                    metricsJson[data.metricType] = data.value;
                    localStorage.setItem("metrics", JSON.stringify(metricsJson));
                }
                return;

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