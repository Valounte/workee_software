import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from '@emotion/styled';

const AvatarStyled = styled(Avatar)`
    width: 32px;
    height: 32px;
    margin: 4px;
`

export const UserIcon = () => {
    const navigate = useNavigate();

    return (
        <div onClick={() => {
            navigate("/w/profile")
        }}>
            <AvatarStyled>T </AvatarStyled>
        </div>
    );
}

export default UserIcon;