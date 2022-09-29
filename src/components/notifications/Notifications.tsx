import { Container, Stack, Typography } from '@mui/material';
import {NotificationCard} from '../ui/NotificationCard/NotificationCard'

export const Notifications = () => {
    return(
        <Container>
            <Typography marginBottom={2} marginTop={2} variant='h1' fontSize='3em'>Vos Notifications</Typography>
            <Stack direction="column">
                <NotificationCard />
            </Stack>
        </Container>
    );
}