import React, { useEffect } from "react";
import '../App.css';
import LoginForm from './loginForm';

function Login(){

    return(
        <div style={{backgroundImage:"url("+require("../images/userLogin.jpg")+")"}} className="loginPage">
            <style type="text/css">
                {"#SideBar {display: none}"}{".Header {display: none}"}
            </style>
            <div className="loginPageForms">
                <div id="loginForm">
                    <LoginForm />
                </div> 
            </div>            
        </div>
    );
}

export default Login;