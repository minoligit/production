import React, { useEffect } from "react";
import '../App.css';
import Home from '@mui/icons-material/Home';
import { getToken, getRole } from "../utils/common";

export const HomeIcon = Home;

export const HomePage = () => {

    useEffect(() => {
    }, []);

    return(
        <div>
            <br/><h2 className="h2">Home</h2><br/>
        </div>
    );
}