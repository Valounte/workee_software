import { useCallback, useState } from 'react';
import { Button } from '../../../ui-kit';
import { Input } from '../input/Input';
import './LoginForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useSnackbar } from 'notistack';


export const LoginForm = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [emailValue, setEmailValue]= useState<string>();
    const [passwordValue, setPasswordValue] = useState<string>();

    const handleChangeEmail = useCallback((event:any) => {
        const target = event.target;
        const email = target.value;
        setEmailValue(email);
    }, []);

    const handleChangePassword = useCallback((event:any) => {
        const target = event.target;
        const password = target.value;
        setPasswordValue(password);
    }, [])

    const handleSubmit = () =>  {
        axios.post('/login', 
        {
            email: emailValue,
            password: passwordValue
        }).then(function (response) {
            const cookie = new Cookies();
            cookie.set(response.data.token, { path: '/' });
            navigate("/w/home");
        }).catch(function(error) {
            enqueueSnackbar(error.response.data.message, {variant: 'error'});
        });
    }
    
    return (
        <form>
            <Input placeholder="email"
            id="loginEmail"
            //setCustom={handleChangeEmail}
            value={emailValue}
            onChange={handleChangeEmail}
            />
            <Input placeholder="password"
            id="loginPassword"
            type="password"
            //setCustom={handleChangePassword}
            value={passwordValue}
            onChange={handleChangePassword} 
            />
            <Button className="workee" onClick={handleSubmit}>Login</Button>
        </form>
    );
}