import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    
    const [message,setMessage] = useState("");
    const [user,setUser] = useState({});
    
    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    if(!token){
        navigate("/login");
    }

    const fetchUserDashboard =async()=>{
       const response = await axios.get("http://localhost:8000/user/dashboard", {
        headers: {
            Authorization:`Bearer ${token}`
        }
       });
       
       setMessage(response.data.msg);
       setUser(response.data.user)
    };

    useEffect(()=>{
        fetchUserDashboard();
    },[]);

  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
      <h2>UserDashboard</h2>
      <h3 style={{border:"1px solid black", padding:"6px"}}>{message}</h3>
      <p>{user.id}</p>
    </div>
  )
}

export default Dashboard
