import { Avatar, Box, Card, Stack, Typography } from "@mui/material"
import { format } from 'date-fns'
import styled from '@emotion/styled';
import { Notification } from "../../notifications/INotification";

const BoldTypo = styled(Typography)`
    font-weight: bold
`

interface NotificationCardProps {
    notification: Notification
}

export const NotificationCard = (props: NotificationCardProps) => {
    const {notification} = props;
    const {message, sentAt, senderFirstname, senderLastname, alertLevel} = notification;
    return (
        <Card elevation={5}>
            <Box padding={2}>
                <Stack direction={"row"} spacing={{sm: 15}}>
                    <Stack justifyContent={"flex-start"} direction={"row"}>
                        <Avatar>{senderFirstname.substring(0,1)}</Avatar>
                        <Stack direction={"column"} textAlign="left" marginLeft={2}>
                            <BoldTypo fontSize='1em'>{senderFirstname + " " + senderLastname + " - " + alertLevel}</BoldTypo>
                            <Typography fontSize='0.75em'>{format(new Date(sentAt),"dd/MM/yyyy HH:mm:ss")}</Typography>
                        </Stack>
                    </Stack>
                    <Typography fontSize='1em'>{message}</Typography>
                </Stack>
            </Box>
        </Card>
    )
}