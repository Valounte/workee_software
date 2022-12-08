import React, { Component } from 'react';

import { Button } from '../ui/button/Button';
import { FormInput } from '../ui/formInput/FormInput';

export default class Login extends Component {
    render() {
        return(
            <div className='container-fluid'>
                <form>
                    <div className="input-container" style={{paddingTop: "10px"}}>
                        <FormInput type="Email"/>
                    </div>
                    <div className="input-container" style={{paddingTop: "10px"}}>
                        <FormInput type="Password"/>
                    </div>
                    <div className="button-container" style={{paddingTop: "10px"}}>
                        <Button type="workee"> Submit </Button>
                    </div>
                </form>
            </div>
        )
    };
}