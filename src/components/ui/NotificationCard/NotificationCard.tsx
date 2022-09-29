import { Avatar, Box, Stack, Typography } from "@mui/material"

export const NotificationCard = () => {
    return (
        <Box>
            <Box>
                <Typography fontSize='1em'>Debi mérite le plus grand des respects woulah</Typography>
            </Box>
            <Box>
                <Stack justifyContent={"flex-start"}>
                    <Avatar>TM</Avatar>
                    <Typography fontSize='1em'>Téo Martin</Typography>
                </Stack>
                <Stack justifyContent={"flex-end"}>
                    <Typography fontSize='1em'>Critique</Typography>
                </Stack>
            </Box>
        </Box>
    )
}