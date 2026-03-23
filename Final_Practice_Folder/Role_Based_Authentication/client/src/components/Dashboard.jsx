import axios from 'axios';
import React, { useEffect } from 'react'

const Dashboard = () => {
    
    const token = localStorage.getItem("token");

    const getDashboard =async()=>{
       const response = await axios.get("http://localhost:8000/user/dashboard", {
        headers: {
            Authorization:`Bearer ${token}`
        }
       });
    };

    useEffect(()=>{
        getDashboard();
    },[]);

  return (
    <div>
      <h2>UserDashboard</h2>
    </div>
  )
}

export default Dashboard
