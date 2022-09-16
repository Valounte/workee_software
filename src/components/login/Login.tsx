import styled from '@emotion/styled';
import { Container, Stack } from '@mui/material';
import { LoginForm } from '../ui/formInput/LoginForm';
import { ReactComponent as LoginImage } from '../../ui-kit/images/workee-login.svg';


const ContainerStyled = styled(Container)`
    height: 85vh
`

export const Login = () => {
    return (
        <ContainerStyled maxWidth="md">
            <Stack direction="row" alignItems='center' height="100%">
                <Stack direction='column' alignItems="flex-start" display={{ xs: 'none', sm: 'flex' }}>
                    <LoginImage width='100%' height='90%' />
                </Stack>
                <LoginForm />
            </Stack>
        </ContainerStyled>
    )
}

export default Login;