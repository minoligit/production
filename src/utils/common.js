import { Pagination } from "react-admin";
import React,{useState,useEffect} from 'react';
import Axios from 'axios';

// return the token from the session storage
export const getToken = () => {
    return sessionStorage.getItem('token') || null;
}
export const getRole = () => {
    return sessionStorage.getItem('role') || null;
}
export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
}

export const ListPagination = () => <Pagination rowsPerPageOptions={[5,10,25,50,100]} />;

export const RoleAccess = (resc,opt) => {
    const [role,setRole] = useState(getRole());
    const [resource,setResource] = useState(resc);
    const [option,setOption] = useState(opt);
    const [access, setAccess] = useState([]); 

    useEffect(() =>{
        Axios.get(`http://localhost:8080/getAccess/${role}/${resource}/${option}`).then((res) => {
            setAccess(res.data);
        });
    }, []);
    return(
        access 
    )
}

