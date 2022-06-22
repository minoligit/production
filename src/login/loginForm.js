import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import Axios from 'axios';
import '../App.css';
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
                navigate('/#/homepage');
                window.location.reload(false);
              }).catch(error => {
                  console.log(error);
                setLoading(false);
                setError("Something went wrong. Please try again later.");
              }); 
        }
        else setError("Please enter correct username and password.");
        setLoading(false);
    }
    const headerStyle = {
        backgroundImage:"linear-gradient(to bottom right, rgb(102, 116, 153), rgb(64, 51, 110))",
        width:"100%",padding:"5%",color:"white",margin:"0"
    }
    const inputStyle = {
        borderRadius:"20px",textAlign:"center",width:"50%",fontSize:"100%",marginTop:"1%",padding:"1%"
    }

    return(
        <div>
            <h3 style={headerStyle}>User Login</h3><br/>
            <label>Username</label><br/>
            <input type="text" placeholder="Enter Username..." required 
                onChange={(e)=>{setUserName(e.target.value)}} style={inputStyle}/><br/><br/>
            <label>Password</label><br/>
            <input type="password" placeholder="Enter Password..." required 
                onChange={(e)=>{setPassword(e.target.value)}} style={inputStyle}/><br/>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
            <input type="button" value={loading ? 'Loading...' : 'Login'} 
                style={{minWidth:"20%",backgroundColor:"#9690eb",borderRadius:"15px",margin:"2%"}}
                onClick={handleLogin} disabled={loading} /><br />
            <button style={{border:"none",textDecoration:"underline",color:"red",backgroundColor:"transparent"}}
                /*onClick={setForgotPswdTrue}*/>Forgot Password</button>
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