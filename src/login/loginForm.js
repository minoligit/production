import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import Axios from 'axios';
import '../App.css';
import './login.css';
// import ForgotPswd from "./forgotPswd";
// import Modal from 'react-modal';

function LoginForm(){

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // const [forgotPswdIsOpen, setForgotPswdIsOpen] = useState(false);
    // const setForgotPswdTrue = ()=> { setForgotPswdIsOpen(true); }
	// const setForgotPswdFalse = ()=> { setForgotPswdIsOpen(false); }


    const handleLogin = () => {
        setError(null);
        setLoading(true);
        const str = {
            userName:userName,
            password:password
        }
        if(userName!=""&&password!=""){
            Axios.post('http://localhost:8080/verifyLogin', str).then(res => {
                setLoading(false);
                sessionStorage.setItem('token',res.data[0].emp_no);
                sessionStorage.setItem('role',res.data[0].role_alias);
                navigate('/#/dashpage');
              }).catch(error => {
                  console.log(error);
                setLoading(false);
                setError("Something went wrong. Please try again later.");
              }); 
        }
        else setError("Please enter correct username and password.");
        setLoading(false);
    }

    return(
        <div>
            <h3 className='headerStyle'>User Login</h3><br/>
            <label>Username</label><br/>
            <input type="text" placeholder="Enter Username..." required 
                onChange={(e)=>{setUserName(e.target.value)}} className='inputStyle'/><br/><br/>
            <label>Password</label><br/>
            <input type="password" placeholder="Enter Password..." required 
                onChange={(e)=>{setPassword(e.target.value)}} className='inputStyle'/><br/>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
            <input type="button" value={loading ? 'Loading...' : 'Login'} className='logBtn'
                onClick={handleLogin} disabled={loading} /><br /><br/>
            <button className="fgtPwdLink" /*onClick={setForgotPswdTrue}*/>Forgot Password</button>
                <div className="Modal">
                    {/* <Modal isOpen={forgotPswdIsOpen} className="popmodal">
                        <button className='closeBtn' onClick={setForgotPswdFalse}>X</button>
                        <ForgotPswd />
                    </Modal> */}
                </div>
            <br/><br/><br/>
        </div> 
    );
}

export default LoginForm;