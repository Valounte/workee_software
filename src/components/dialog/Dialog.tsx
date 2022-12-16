import { useEffect, useState } from 'react';
import './Dialog.css';
import FeedBackDialog from './FeedBackDialog/FeedBackDialog';

function Dialog() {

    const [open, setOpen] = useState(false);

    async function init() {
        let win = window as any;

        win.api.sendMessage((event: any, value: any) => {
            console.log(value);
        });

        win.api.launchFeedBack((event: any, value: any) => {
            setOpen(true);
        });
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <div>
            {open && <FeedBackDialog open={open} setOpen={setOpen}/>}
        </div>
    );
}

export default Dialog;