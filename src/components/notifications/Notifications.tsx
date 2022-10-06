import { Container, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {NotificationCard} from '../ui/NotificationCard/NotificationCard'
import type { INotification } from './INotification';

const token = localStorage.getItem("token");

const config = {
    headers: { Authorization: `Bearer ${token}` }
};

export const Notifications = () => {
    const [notifications, setNotifications] = useState<INotification[]>();
   
    async function init() {
        const notif = await axios.get("/notifications", config);
        setNotifications(notif.data);
    }

    useEffect(() => {
        init()
    }, [])

    return(
        <Container>
            <Typography marginBottom={2} marginTop={2} variant='h1' fontSize='3em'>Vos Notifications</Typography>
            <Stack direction="column">
            {notifications?.map((notification) => {
                return(<NotificationCard notification={notification} marginBot={"10px"} key={notification.id}/>);
            })} 
            </Stack>
        </Container>
    );
}