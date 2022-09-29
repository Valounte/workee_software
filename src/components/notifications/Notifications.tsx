import { Container, Stack } from '@mui/material';
import {NotificationCard} from '../ui/NotificationCard/NotificationCard'

export const Notifications = () => {
    return(
        <Container >
            <Stack direction="column" alignItems='center' height="100%">
                <NotificationCard />
            </Stack>
        </Container>
    );
}