import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserDashboard = () => {
  const navigate = useNavigate();

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
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <h1>This is the UserDashboard page</h1>
    </>
  );
};

export default UserDashboard;
