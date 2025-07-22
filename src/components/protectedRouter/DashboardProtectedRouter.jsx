import React from 'react'
import { jwtDecode } from "jwt-decode";
import { Navigate } from 'react-router-dom';
export default function DashboardProtectedRouter({children}) {

    
    const token = localStorage.getItem("userToken");
    if(!token) return <Navigate to='/login'/>

    const decode = jwtDecode(token);
    console.log(decode);
   
    const roleClaim ="http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    const role = decode[roleClaim];

    if( role != 'SuperAdmin'){
       
    return <Navigate to='/' />
     }
    
 

  return  children;
  
}
