import React, { Component } from 'react';
import { LoginForm } from '../ui/formInput/LoginForm';

export default class Login extends Component {
    render() {
        return(
            <div className='container-fluid'>
                <LoginForm />
            </div>
        )
    };
}