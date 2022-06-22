import React, { useState,useEffect } from "react";
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';
import '../App.css';

function ForgotPswd() {

    const [officeEmail,setOfficeEmail] = useState(null);
    const [otp,setOTP] = useState(null);
    var [error, setError] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    var [validity, setValidity] = useState(null);
    var [color, setColor] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.getElementById("step01").style.display="block";
        document.getElementById("step02").style.display="none";
        document.getElementById("step03").style.display="none";
    }, []);

    function sendOTP(){
        setError(null);
        const str = {
            officeEmail:officeEmail
        };
        Axios.post("http://localhost:8080/checkEmail",str).then((res) => {
            if(res.data.length>0){
                setError(res.data);
            }
            else{
                document.getElementById("step01").style.display="none";
                document.getElementById("step02").style.display="block";
                document.getElementById("step03").style.display="none";
            }
        });
    }
    function goBack(){
        document.getElementById("step01").style.display="block";
        document.getElementById("step02").style.display="none";
        document.getElementById("step03").style.display="none";
    }
    function verifyOTP(){
        setError(null);
        const str = {
            otp:otp
        };
        Axios.post("http://localhost:8080/checkOTP",str).then((res) => {
            if(res.data.length>0){
                setError(res.data);
            }
            else{
                document.getElementById("step01").style.display="none";
                document.getElementById("step02").style.display="none";
                document.getElementById("step03").style.display="block";
            }
        });
    }
    function checkNewPassword(e) {
        setNewPassword(e.target.value);
        setValidity(null);
        setError(null);
        const p1 = /[A-Z]+/;
        const p2 = /[a-z]+/;
        const p3 = /[0-9]+/;

        if((e.target.value)===""){
            document.getElementById("update").style.display="none";
            setValidity("Password cannot be null");
            setColor("red");
        }
        else if(((e.target.value).length<8)||((e.target.value).length>20)){
            document.getElementById("update").style.display="none";
            setValidity("Weak Password");
            setColor("red");
        }
        else if((p1.test(e.target.value))&&(p2.test(e.target.value))&&(p3.test(e.target.value))){
            document.getElementById("update").style.display="block";
            setValidity("Strong Password");
            setColor("green");
        }
        else{
            document.getElementById("update").style.display="none";
            setValidity("Weak Password");
            setColor("red");
        }
    };
    const updatePrivacy = () => {
        setError(null);
        if((newPassword==null)||(confirmPassword==null)){
            setError("Password cannot be null.");
        }
        else if((color==="green")&&(newPassword===confirmPassword)){
            const str = {
                email:officeEmail,
                password:newPassword
            }
            Axios.post("http://localhost:8080/updatePswd",str).then((res) => {
                // setUserSession(res.data[0].userId, res.data[0].username);
                sessionStorage.setItem('token',res.data[0].emp_no);
                sessionStorage.setItem('role',res.data[0].role_alias);
                alert("Password is updated");
            });
            navigate('/pages/dashpage');
            window.location.reload(false);
        }
        else{
            setError("Passwords are not matching. Please try again.");
        }  
    };

    return(
        <div style={{padding:"6%"}}>
            <div id="step01">
                <label className="labelStyle">Enter Email</label>
                <input type="email" onChange={(e)=>{setOfficeEmail(e.target.value)}}
                    className="inputStyle"/><br/><br/>
                {error && <><small style={{ color: 'red' }}>{error}</small><br/></>}
                <div style={{textAlign:"right",marginTop:"10%"}}>
                    <button className="buttonStyle btn btn-primary" onClick={sendOTP}>Send</button>
                </div>
            </div>
            <div id="step02">
                <p>We have sent an one-time password to your email. Please check.</p><br/>
                <label className="labelStyle">Enter the OTP</label>
                <input type="text" onChange={(e)=>{setOTP(e.target.value)}}
                    className="inputStyle"/><br/><br/>
                {error && <><small style={{ color: 'red' }}>{error}</small><br/></>}
                <div>
                    <div style={{textAlign:"left",marginTop:"10%"}}>
                        <button className="buttonStyle btn btn-primary" onClick={goBack}>Back</button>
                    </div>
                    <div style={{textAlign:"right",marginTop:"10%"}}>
                        <button className="buttonStyle btn btn-primary" onClick={verifyOTP}>Enter</button>
                    </div>
                </div>
            </div>
            <div id="step03">
                <label className="labelStyle">New Password</label>
                <input type="password" onChange={(e)=>{checkNewPassword(e)}}
                    className="inputStyle"/><br/><br/>
                {validity && <><small style={{ color: color }}>{validity}</small><br/></>}
                <label className="labelStyle">Confirm Password</label>
                <input type="password" onChange={(e)=>{setConfirmPassword(e.target.value)}}
                    className="inputStyle"/><br/><br/>
                {error && <><small style={{ color: 'red' }}>{error}</small><br/></>}
                <div style={{textAlign:"right",marginTop:"10%"}} id="update">
                    <button className="buttonStyle btn btn-primary" type="submit" onClick={updatePrivacy}>Update</button>
                </div>
            </div>
        </div>
    );

}

export default ForgotPswd;