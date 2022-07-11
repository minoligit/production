import React, { useEffect,useState } from "react";
import { List,Datagrid} from 'react-admin';
import '../App.css';
import Home from '@mui/icons-material/Home';
import { getToken, getRole,RoleAccess } from "../utils/common";

export const HomeIcon = Home;

export const HomePage = (usersOptions) => {
    // const [usersOptions, setUsersOptions] = useState(); 

    useEffect(() => {
        // console.log(<RoleAccess userOptions={usersOptions}/>);
    }, []);

    return(
        <div>
            <br/><h2 className="h2">Home</h2><br/>
            {/* <RoleAccess /> */}
        </div>
    );
}