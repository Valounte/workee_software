import { useEffect, useMemo, useRef, useState } from "react";

export const Notification = (props: any) => {

    const url = useMemo(() => new URL(props.config.url), [props.config.url]);

    let eventSource = useRef<EventSource>();

    const [printAlert, setPrintAlert] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (eventSource.current) {
            eventSource.current.close();
        }
        url.searchParams.append("topic", props.config.topic);
        eventSource.current = new EventSource(url);
        eventSource.current.onmessage = (event: MessageEvent) => {
            let data = JSON.parse(event.data);
            setMessage(data.message);
            setPrintAlert(true);
            setTimeout(() => {
                setPrintAlert(false);
            }, 5000);
        }
    }, [props.config.topic, url]);

    return (
        <div>
            {printAlert && <div className="alert alert-primary" role="alert">
                {message}
            </div>}
            {props.children}
        </div>
        );
};