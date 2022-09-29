import { Avatar, Box, Card, Stack, Typography } from "@mui/material"
import { format } from 'date-fns'
import styled from '@emotion/styled';
import { padding } from "@mui/system";

const BoldTypo = styled(Typography)`
    font-weight: bold
`
var date = new Date("2022-09-29T14:26:09+02:00");


export const NotificationCard = () => {
    return (
        <Card elevation={5}>
            <Box padding={2}>
                <Stack justifyContent={"space-between"} direction={"row"}>
                    <Stack justifyContent={"flex-start"} direction={"row"}>
                        <Avatar>T</Avatar>
                        <Stack direction={"column"} textAlign="left" marginLeft={2}>
                            <BoldTypo fontSize='1em' >Téo Martin</BoldTypo>
                            <Typography fontSize='1em'>{format(date,"dd MMMM yyyy")}</Typography>
                        </Stack>
                    </Stack>
                    <Typography fontSize='1em'>Lorem Ipsum is simply dummy text of the printing and t</Typography>
                </Stack>
            </Box>
        </Card>
    )
}