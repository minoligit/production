import * as React from "react";
import { Layout, AppBar } from "react-admin";
import * as FiIcons from "react-icons/fi";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../App.css';
import Profile from './profile';

const SwitchLanguage = () => {
  
  return (
    <div></div>
  );
};


const MyUserMenu = props => (

  <div style={{display:"flex",width:"20%"}}>
    <div className='headericon' style={{margin:"auto"}}></div>
    <div className='headericon'><FiIcons.FiSettings /></div>
    <div className='headericon' style={{backgroundColor:"transparent"}}><Profile /></div>
  </div>
);

const MyAppBar = props => (
  <AppBar {...props} userMenu={<MyUserMenu />} />
);

export default props => <Layout {...props} appBar={MyAppBar} />;
