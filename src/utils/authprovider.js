import { useRedirect } from "react-admin";
import { Navigate } from "react-router-dom";
import { getToken } from "../utils/common";

const AuthProvider = {
    // login: ({ username, password }) => {
    //     if (username !== 'john' || password !== '123') {
    //         return Promise.reject();
    //     }
    //     localStorage.setItem('username', username);
    //     return Promise.resolve();
    // },
    // logout: () => {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('user');        
    //     // localStorage.removeItem('username');
    //     return Promise.resolve();
    // },
    checkAuth: () =>
        sessionStorage.getItem('token') ? Promise.resolve() : Promise.reject(),
    // checkAuth: () =>{
    //     localStorage.getItem('token') ? Promise.resolve() : <Link to="./#/login"/>;
    // },
    checkError:  (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            sessionStorage.removeItem('token');
            return Promise.reject();
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },
    getIdentity: () =>
        Promise.resolve({
            id: 'token',
            fullName: getToken()
        }),
    // getPermissions: () => Promise.resolve(''),
    getPermissions: () => {
        const role = localStorage.getItem('role');
        return role ? Promise.resolve(role) : Promise.reject();
    }
};

export default AuthProvider;