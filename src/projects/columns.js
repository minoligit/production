import React,{useState,useEffect} from 'react';
import Axios from 'axios';

const ProjectColumns = () => {
    const [projectColumns, setProjectColumns] = useState([]);  

    useEffect( () =>{
        Axios.get("http://localhost:8080/getProjectColumns").then((res) => {
            setProjectColumns(res.data);
        });
    }, []);
    return(
        projectColumns
    );
    
}
export default ProjectColumns;

