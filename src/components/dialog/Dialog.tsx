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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log(messageList);
    }, [messageList]);

    return (
        <div>
            {open && <FeedBackDialog open={open} setOpen={setOpen}/>}
            {messageList.map((message, index) => {
                
                return (
                    <div key={index}>
                        <InfoMessageDialog message={message} index={index} readMessage={readMessage}/>
                    </div>
                );
            })}
            {/* {message.message && <InfoMessageDialog message={message} setMessage={setMessage}/>} */}
        </div>
    );
}

export default Dialog;