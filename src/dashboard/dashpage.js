import React, { useEffect } from "react";
import '../App.css';
import { getToken} from '../utils/common';
import DashBoard from '@mui/icons-material/Dashboard';

export const DashboardIcon = DashBoard;

export const DashPage = () => {

    
    return(
        <div>
            <br/><h2 className="h2">DashBoard</h2><br/>
        </div>
    );
}
