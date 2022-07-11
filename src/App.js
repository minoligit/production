import React from 'react';
import {Admin,Resource} from 'react-admin';
import './pages/pages.css';
import Login from './login/login';
import Layout from './components/layout';
import theme from './components/theme';
import home from './home';
import dashboard from './dashboard';
import users from './users';
import projects from './projects';
import servers from './servers';
import AuthProvider from './utils/authprovider';
import dataprovider from "./utils/dataprovider";
const apiUrl = "http://localhost:8080";
const dataProvider = dataprovider(apiUrl);


function App(){ 
    return(
        <Admin theme={theme} layout={Layout} loginPage={Login} authProvider={AuthProvider} 
            dataProvider={dataProvider} requireAuth>
            <Resource name='home' options={{label:"Home"}} {...home}/>
            <Resource name='dashboard' options={{label:"Dashboard"}} {...dashboard}/>
            <Resource name="users" {...users} />
            <Resource name="projects" {...projects} />
            <Resource name="servers" {...servers} />
        </Admin>
    );
}

export default App;