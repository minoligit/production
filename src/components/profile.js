import React, {useState,useEffect} from "react";
import { getToken, removeUserSession } from '../utils/common';
import {useNavigate} from 'react-router-dom';
import '../App.css';
import Axios from 'axios';
import { Avatar } from "@mui/material";


function Profile( props){

    const [profilePicPath, setProfilePicPath] = useState();
    const [loggedUser, setLoggedUser] = useState([]);
    const navigate = useNavigate();
    const ImgPath = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";


    function logOut(){
        removeUserSession();       
        navigate('/login');
        window.location.reload(false);
    }
    useEffect(() => {
        const str = {
            userId:getToken()
        };
        Axios.post("http://localhost:8080/getLoggedUser",str).then((res) => {
            setLoggedUser(res.data);
        });
    }, []);

    const dropDown = {
        backgroundColor: "white",
        fontSize: "80%",
        fontWeight: "500",
        padding: "1%",
        width: "250px",
        color: "black"
    };
    // const profilePic = {
    //     width: "35px",height: "35px",
    //     cursor: "pointer",
    //     top: "0", left: "0",
    // }

    const styles = props.className?props.className:"";
    return(
        <>
            <button type="button" data-bs-toggle="dropdown" className="profilePicIcon">
            <Avatar src="https://marmelab.com/images/avatars/adrien.jpg" />
            </button>
            <div className="dropdown-menu" style={dropDown}>
                <div> 
                    {loggedUser.map((data,key) =>(
                        <div key={key}>{"Emp No : "+data.emp_no}<br/>{data.full_name}<br/>
                            <br/><br/>
                        </div>
                    ))} 
                </div>
                <div onClick={logOut} style={{backgroundColor:"#7575c7",borderRadius:"5px",textAlign:"center",
                    color: "white",height:"40px",cursor:"pointer",margin:"5%",padding:"2%"}}>
                        Sign-out
                </div>
            </div>
        </>
    );
}

export default Profile;