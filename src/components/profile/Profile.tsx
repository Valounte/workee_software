import { Avatar, Button, Chip, CircularProgress, Container, Stack, styled, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IUser } from "./IUser";
import { useNavigate } from "react-router-dom";

const GreyTypo = styled(Typography)`
  color: grey;
`;

export const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>();
  const [userLoaded, setUserLoaded] = useState<Boolean>()

  var win = window as any;
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };


    const fetchUserData = async () => {
        try {
            const me = await axios.get("/me", config);
            return {success: true, data: me};
        } catch (error) {
            console.log(error);
            return {success: false}
        }
    }       

    useEffect(() => {
        if (token === "") {
            navigate("/w/login");
        }
        (async () => {
            setUserLoaded(false);
            let res = await fetchUserData();
            if (res.success) {
                setUser(res.data?.data);
                setUserLoaded(true);
            }
        }) ();
    }, [])

  return (
    <Container>
        {userLoaded ? (
        <Container>
            <Typography marginBottom={2} marginTop={2} variant="h3" fontSize="3em">
                Profil
            </Typography>
            <Stack
                direction={"row"}
                spacing={{ sm: 2 }}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Avatar
                alt={user?.firstname}
                src={user?.picture}
                sx={{ width: 50, height: 50 }}
                />
                <Typography variant="h6">
                {user?.firstname + " " + user?.lastname}
                </Typography>
            </Stack>
            <Stack direction={"column"} paddingLeft={20}>
                <Stack direction={"row"} spacing={{ sm: 18 }} marginTop={2}>
                <GreyTypo variant="h4" fontSize="1.25em">
                    Mail
                </GreyTypo>
                <Typography variant="h4" fontSize="1.25em">
                    {user?.email}
                </Typography>
                </Stack>
                <Stack direction={"row"} spacing={{ sm: 11 }} marginTop={2}>
                <GreyTypo variant="h4" fontSize="1.25em">
                    Entreprise
                </GreyTypo>
                <Typography variant="h4" fontSize="1.25em">
                    {user?.company.name}
                </Typography>
                </Stack>
                <Stack direction={"row"} spacing={{ sm: 16 }} marginTop={2}>
                <GreyTypo variant="h4" fontSize="1.25em">
                    Poste
                </GreyTypo>
                <Typography variant="h4" fontSize="1.25em">
                    {user?.job.name}
                </Typography>
                </Stack>
                <Stack
                direction={"row"}
                spacing={13}
                marginTop={2}
                marginBottom={5}
                >
                    <GreyTypo variant="h4" fontSize="1.25em">
                        Equipes
                    </GreyTypo>
                    <Stack direction={"row"} spacing={1}>
                        {user?.teams?.map((team) => {
                            return(<Chip label={team.name}/>)})
                        }
                    </Stack>
                </Stack>
            </Stack>
            <Button
                onClick={async () => {
                localStorage.setItem("token", "");
                await win.api.getLogout();
                navigate("/w/login");
                }}
                variant="outlined"
            >
                Se Deconnecter
            </Button>
        </Container>
        ) : (
            <Stack alignItems={"center"} marginTop={20}>
                <CircularProgress color="secondary"/>
            </Stack>
        )}
    </Container>
  );
};
