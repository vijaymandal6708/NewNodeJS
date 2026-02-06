import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserDashboard = () => {
  const navigate = useNavigate();

  const [user,setUser] = useState({});

  const loadData = async () => {
    const token = localStorage.getItem("token");
    console.log(token);

    const response = await axios.get(
      "http://localhost:4000/user/user-dashboard-validate",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log(response.data);

    setUser(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <h1>This is the UserDashboard page</h1>
      
      <p>Your id is : {user._id}</p>
      <p>Your name is : {user.name}</p>
      <p>Your email is : {user.email}</p>
      <p>Your role is : {user.role}</p>
    </>
  );
};

export default UserDashboard;
