import './Login.css';
import React, {} from 'react';

import axios from '../../axiosConfig';
import { login } from '../../api/login';



export default function Login({setIsLoggedIn}){
    function handleSubmit(e){
        e.preventDefault();
        const user = {
            firstName: e.target.firstName.value,
            lastName:e.target.lastName.value,
            password: e.target.password.value
        }
        login(user).then((response) =>{
            if(response.status === 200){ //if login success logic goes here
                setIsLoggedIn(true)
            }
            //alerting user what is wrong with their credentials goes here 
        })
    }
    return(
        <div id="login">
            <form className ="login-form" onSubmit = {handleSubmit}>
                <input type="text" placeholder="first name" required name = 'firstName'/>
                <input type="text" placeholder="last name" required name = 'lastName'/>
                <input type="password" placeholder="password" required name = 'password'/>
                <button>Login</button>
            </form>
        </div>
    )
}