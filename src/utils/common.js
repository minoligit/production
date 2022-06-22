import { Pagination } from "react-admin";

// // return the user data from the session storage
// export const getUser = () => {
//     const userStr = sessionStorage.getItem('user');
//     if (userStr) return JSON.parse(userStr);
//     else return null;
// }
   
// // return the token from the session storage
// export const getToken = () => {
//     return sessionStorage.getItem('token') || null;
// }
   
// // remove the token and user from the session storage
// export const removeUserSession = () => {
//     sessionStorage.removeItem('token');
//     sessionStorage.removeItem('user');
// }
   
// // set the token and user from the session storage
// export const setUserSession = (token, user) => {
//     sessionStorage.setItem('token', token);
//     sessionStorage.setItem('user', JSON.stringify(user));
// }

// export const getUser = () => {
//     // const userStr = localStorage.getItem('user');
//     // if (userStr) return JSON.parse(userStr);
//     // else return null;
//     return sessionStorage.getItem('username') || null;
// }
   
// return the token from the session storage
export const getToken = () => {
    return sessionStorage.getItem('token') || null;
}
export const getRole = () => {
    return sessionStorage.getItem('role') || null;
}
export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
}

export const ListPagination = () => <Pagination rowsPerPageOptions={[5,10,25,50,100]} />;

