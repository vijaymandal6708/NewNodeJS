import axios from 'axios';
import React, { useEffect } from 'react'

const Dashboard = () => {
    
    const token = localStorage.getItem("token");

    const authorizeUser =async()=>{
       const response = await axios.get("http://localhost:8000/user/authorize-user", {
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
      <h2>Dashboard</h2>
    </div>
  )
}

export default Dashboard
