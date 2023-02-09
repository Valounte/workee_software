import { useEffect, useState } from 'react';
import './Dialog.css';
import FeedBackDialog from './FeedBackDialog/FeedBackDialog';
import InfoMessageDialog from './InfoMessageDialog/InfoMessageDialog';

export interface IInfoMessage {
    message: string | null;
    type: string | null;
}

function Dialog() {

    const [open, setOpen] = useState(false);
    const [messageList, setMessageList] = useState<Array<IInfoMessage>>([]);

    function readMessage(index: number) {
        setMessageList(prevList => prevList.filter((_, i) => i !== index));
    }

    async function init() {
        let win = window as any;

        win.api.sendMessage((event: any, value: IInfoMessage) => {
            let newMessageList = [...messageList];
            newMessageList.push(value);
            setMessageList([...newMessageList]);
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