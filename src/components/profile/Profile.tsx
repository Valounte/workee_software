import { Avatar, Container } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IUser } from './IUser';


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
            <Avatar alt={user?.firstname} src={user?.picture} />
            <p>{user?.email}</p>
        </Container>
    );
}
export default Profile;