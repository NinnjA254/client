import './Login.css';
import React, {} from 'react';

import axios from '../../axiosConfig';



export default function Login({setIsLoggedIn}){
    function handleSubmit(e){
        e.preventDefault();
        const user = {
            firstName: e.target.firstName.value,
            lastName:e.target.lastName.value,
            password: e.target.password.value
        }
        axios.post('/login',user).then((res) =>{
            if(true){ //if login success logic goes here
                setIsLoggedIn(true)
            }
            
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