import axios from 'axios';
import React, { useEffect } from 'react'

const AdminDashboard = () => {
    
    const token = localStorage.getItem("token");

    const authorizeUser =async()=>{
       const response = await axios.get("http://localhost:8000/user/authorize-admin", {
        headers: {
            Authorization:`Bearer ${token}`
        }
       });
    };

    useEffect(()=>{
        authorizeUser();
    },[]);

  return (
    <div>
      <h2>AdminDashboard</h2>
    </div>
  )
}

export default AdminDashboard

