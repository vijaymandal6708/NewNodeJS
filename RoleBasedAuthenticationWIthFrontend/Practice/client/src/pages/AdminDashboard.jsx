import React, { useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {

    const token = localStorage.getItem("token");

    const loadData=async()=>{
        const response = await axios.get(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/dashboard/admin`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
    };

    useEffect(()=>{
        loadData();
    },[]);

  return (
    <>
      
    </>
  )
}

export default AdminDashboard
