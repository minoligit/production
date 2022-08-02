import * as React from "react";
import { Layout, AppBar } from "react-admin";
import * as FiIcons from "react-icons/fi";
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../App.css';
import Profile from './profile';
import { Icon } from "../notifications/getNotifications";

const MyUserMenu = props => (

  <div style={{display:"flex",width:"20%"}}>
    <button className='headericon'><NavLink to={"/notifications"} style={{color:"white"}}><Icon/></NavLink></button>
    <div className='headericon'><FiIcons.FiSettings /></div>
    {/* <div className='headericon' style={{backgroundColor:"transparent"}}></div> */}
    <Profile className='headericon' />
  </div>
);

const MyAppBar = props => (
  <AppBar {...props} userMenu={<MyUserMenu />} />
);

export default props => <Layout {...props} appBar={MyAppBar} />;

export const ListStyle = () => ({
  '& .RaDatagrid-headerCell': {
      backgroundColor: '#7e7ea1'
  },
  '& .RaDatagrid-rowEven': {
      backgroundColor: '#e1e1fc'
  }
});
