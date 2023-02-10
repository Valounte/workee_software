import { DialogContentText} from '@mui/material';
import * as React from 'react';
import { Button, Container, Dialog, DialogTitle } from '../../../ui-kit';
import './InfoMessageDialog.css';
import { IInfoMessage } from '../Dialog';


interface IMessageDialogProps {
    message: IInfoMessage;
    index: number;
    readMessage: (index: number) => void;
}


function InfoMessageDialog(props: IMessageDialogProps) {

    const [open, setOpen] = React.useState(true);
    async function handleClick() {
        props.readMessage(props.index);
        setOpen(false);
    }

    return (
        <Dialog fullWidth={true} open={open}>
            <DialogTitle>
                Informations importante
            </DialogTitle>
            <Container>
                <DialogContentText>{props.message.message}</DialogContentText>
            </Container>
            <Container>
                <Button variant="contained" color="secondary" onClick={handleClick}>C'est fait</Button>
            </Container>
        </Dialog>
    );
}

export default InfoMessageDialog;