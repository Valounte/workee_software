import { Button, Container, Dialog, DialogContentText, DialogTitle } from '../../../ui-kit';


interface ITeaOrCoffeeProps {
    open: boolean;
    name: string;
    setOpen: (open: boolean) => void;
}

function TeaOrCoffeeDialog(props: ITeaOrCoffeeProps) {
    async function handleClick() {
        props.setOpen(false);
    }

    return(
        <Dialog fullWidth={true} open={props.open}>
            <DialogTitle>
                {props.name}
            </DialogTitle>
            <Container>
                <DialogContentText>N'oubliez pas votre meeting dans 10 minutes !</DialogContentText>
            </Container>
            <Container>
                <Button variant="contained" color="secondary" onClick={handleClick}>OK</Button>
            </Container>
        </Dialog>
    )
}

export default TeaOrCoffeeDialog;