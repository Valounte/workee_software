import axios from 'axios';
import { useNavigate } from "react-router-dom";

import { Button } from '../ui/button/Button';
import { LoginForm } from '../ui/formInput/LoginForm';

export const Login = (props:any) => {

    /*axios.post("http://localhost:39147", 
    {
        "email": email, 
        "password": password
    }).then( result => {
        console.log(result);
        navigate("/w/test");
    }).catch(error => {
        console.log(error);
        var email = document.getElementById("email");
        var password = document.getElementById("email");            
    })*/
    return (
        <LoginForm />
    )
}

export default Login;