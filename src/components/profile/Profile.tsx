import { Avatar, Button, Container, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IUser } from './IUser';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react-hooks/rules-of-hooks
const navigate = useNavigate();

const token = localStorage.getItem("token");
const config = { headers: { Authorization: `Bearer ${token}` } };

    
export const Profile = () => {
    const [user, setUser] = useState<IUser>();

    async function init() {
        const me = await axios.get("/me", config);
        setUser(me.data);
    }

    useEffect(() => {
        init()
    }, [])


    return (
        <Container>
            <Typography marginBottom={2} marginTop={2} variant='h3' fontSize='3em'>Mon Profil</Typography>
            <Stack direction={"row"} spacing={{sm: 5}}>
                <Avatar alt={user?.firstname} src={user?.picture} />
                <Stack direction={"column"} spacing={{sm: 1}}>
                    <Typography variant='h4' fontSize='1em'>{user?.email}</Typography>
                    <Typography variant='h4' fontSize='1em'>{user?.firstname + " " + user?.lastname}</Typography>
                </Stack>
                <Stack direction={"column"}>
                    <Typography variant='h4' fontSize='1.5em'>Entreprise</Typography>
                    <Typography variant='h4' fontSize='1em'>{user?.company.name}</Typography>
                    <Typography variant='h4' fontSize='1.5em'>Equipe</Typography>
                    <Typography variant='h4' fontSize='1em'>{user?.teams[0].name}</Typography>
                    <Typography variant='h4' fontSize='1.5em'>Job</Typography>
                    <Typography variant='h4' fontSize='1em'>{user?.job.name}</Typography>
                </Stack>
                <Button onClick={() => {
            localStorage.setItem("token", "");
            navigate("/w/login")
        }}>Se Deconnecter</Button>
            </Stack>
        </Container>
    );
}
export default Profile;