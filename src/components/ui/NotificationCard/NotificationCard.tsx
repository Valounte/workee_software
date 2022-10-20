import { Avatar, Box, Card, Stack, Typography } from "@mui/material"
import { format } from 'date-fns'
import styled from '@emotion/styled';
import { Notification } from "../../notifications/INotification";
import { AlertBadge } from "../AlertBadge/AlertBadge";

const BoldTypo = styled(Typography)`
    font-weight: bold
`

interface NotificationCardProps {
    notification: Notification
    marginBot: string
}

export const NotificationCard = (props: NotificationCardProps) => {
    const {notification, marginBot} = props;
    const {message, sentAt, senderFirstname, senderLastname, alertLevel} = notification;
    return (
        <Box marginBottom={marginBot}>
            <Card elevation={5}>
                <Box padding={2}>
                    <Stack direction={"row"}>
                        <Stack direction={"column"} spacing={{sm: -2}}>
                            <Stack justifyContent={"flex-start"} direction={"row"}>
                                <Avatar>{senderFirstname.substring(0,1)}</Avatar>
                                <Stack direction={"row"} marginLeft={2}>
                                    <BoldTypo fontSize='1em'>{senderFirstname + " " + senderLastname}</BoldTypo>
                                    <Typography fontSize='0.75em'>{format(new Date(sentAt),"dd/MM/yyyy HH:mm:ss")}</Typography>
                                </Stack>
                            </Stack>
                            <Stack  justifyContent={"flex-start"}>
                                <Typography fontSize='1em' >{message}</Typography>
                            </Stack>
                        </Stack>
                        <Stack justifyContent={"flex-end"} marginLeft={40}>
                            <AlertBadge alertType={alertLevel}/>
                   </Stack>
               </Stack>
            </Box>
        </Card>
    </Box>
    )
}