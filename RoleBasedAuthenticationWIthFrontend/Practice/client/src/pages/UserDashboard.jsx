import React, { useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
    
    const token = localStorage.getItem("token");

    const loadData=async()=>{
        await axios.get(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/auth/profile`,
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        );
    };

    useEffect(()=>{
        loadData();
    }, []);

  return (
    <div>
      <h1>This is UserDashboard Page</h1>
    </div>
  )
};

export default UserDashboard
