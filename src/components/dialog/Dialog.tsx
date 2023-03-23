import { useEffect, useMemo, useRef, useState } from 'react';
import { Config } from '../../Config';
import EventsUtils from '../../utils/events';
import './Dialog.css';
import FeedBackDialog from './FeedBackDialog/FeedBackDialog';
import InfoMessageDialog from './InfoMessageDialog/InfoMessageDialog';
import TeaOrCoffeeDialog from './TeaOrCoffeeDialog/TeaOrCoffeeDialog';

export interface IInfoMessage {
    message: string | null;
    type: string | null;
}

function Dialog() {

    const [open, setOpen] = useState(false);
    const [openTeaOrCoffee, setOpenTeaOrCoffee] = useState(false);
    const [team, setTeam] = useState(0);
    const [name, setName] = useState("");
    const [messageList, setMessageList] = useState<Array<IInfoMessage>>([]);

    function readMessage(index: number) {
        setMessageList(prevList => prevList.filter((_, i) => i !== index));
    }

    async function init() {
        let win = window as any;

        win.api.sendMessage((_event: any, value: IInfoMessage) => {
            let newMessageList = [...messageList];
            newMessageList.push(value);
            setMessageList([...newMessageList]);
        });

        win.api.launchFeedBack((_event: any, _value: any) => {
            setOpen(true);
        });
    }

    useEffect(() => {
        init();
        EventsUtils.subscribe("TeaOrCoffee", (data: any) => {
                setOpenTeaOrCoffee(true);
                setName(data.detail.name);
        });
        EventsUtils.subscribe("feedback", (data: any) => {
            setOpen(true);
            setTeam(data.detail.teamId);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {open && <FeedBackDialog open={open} setOpen={setOpen} teamId={team}/>}
            {openTeaOrCoffee && <TeaOrCoffeeDialog open={openTeaOrCoffee} setOpen={setOpenTeaOrCoffee} name={name}/>}
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