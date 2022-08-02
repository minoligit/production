import React from 'react';
import {Admin,Resource} from 'react-admin';
import Login from './login/login';
import Layout from './components/layout';
import theme from './components/theme';
import dashboard from './dashboard';
import users from './users';
import projects from './projects';
import servers from './servers';
import roles from './roles';
import notifications from './notifications';
import AuthProvider from './utils/authprovider';
import Dataprovider from "./utils/dataprovider";

const apiUrl = "http://localhost:8080";
const dataProvider = Dataprovider(apiUrl);

function App(){ 

    return(
        <Admin theme={theme} layout={Layout} loginPage={Login} authProvider={AuthProvider} 
            dataProvider={dataProvider} requireAuth>
            <Resource name='dashboard' options={{label:"Dashboard"}} {...dashboard}/>
            <Resource name="roles" {...roles} />
            <Resource name="servers" {...servers} />
            <Resource name='users' {...users} />
            <Resource name="projects" {...projects} />         
            <Resource name="notifications" {...notifications} />
        </Admin>
    );
}

export default App;