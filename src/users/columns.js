import React,{useState,useEffect} from 'react';
import Axios from 'axios';

const UserColumns = () => {
    const [userColumns, setUserColumns] = useState([]);  

    useEffect( () =>{
        Axios.get("http://localhost:8080/getUserColumns").then((res) => {
            setUserColumns(res.data);
        });
    }, []);
    return(
        userColumns
    );
    
}
export default UserColumns;