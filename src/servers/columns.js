import React,{useState,useEffect} from 'react';
import Axios from 'axios';

const ServerColumns = () => {
    const [serverColumns, setServerColumns] = useState([]);  

    useEffect( () =>{
        Axios.get("http://localhost:8080/getServerColumns").then((res) => {
            setServerColumns(res.data);
        });
    }, []);
    return(
        serverColumns
    );
    
}
export default ServerColumns;