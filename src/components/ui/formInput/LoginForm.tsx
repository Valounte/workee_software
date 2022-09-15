import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { Button } from '../button/Button';
import { Input } from '../input/Input';
import './LoginForm.css';

export const LoginForm = () => {
    //const navigate = useNavigate();

    const [emailValue, setEmailValue]= useState<string>();
    const [passwordValue, setPasswordValue] = useState<string>();

    const handleChangeEmail = (event:any) => {
        const target = event.target;
        const email = target.email;
        setEmailValue(email);
        console.log(emailValue);
    }

    const handleChangePassword = (event:any) => {
        const target = event.target;
        const password = target.passwordValue;
        setPasswordValue(password);
        console.log(passwordValue);
    }

    const handleSubmit = () =>  {
        
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <Input placeholder="email"
            setCustom={setEmailValue}
            value={emailValue}
            onChange={handleChangeEmail}
            />
            <Input placeholder="password"
            setCustom={setPasswordValue}
            value={passwordValue}
            onChange={handleChangePassword} />
            <Button className="workee" type="submit">Login</Button>
        </form>
    );
}