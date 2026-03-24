import axios from "axios";
import React, { useEffect } from "react";

const Dashboard = () => {
  const fetchUserDashboard = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:8000/user/fetch-user-dashboard",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(response.data);
  };
  useEffect(() => {
    fetchUserDashboard();
  }, []);
  return <div></div>;
};

export default Dashboard;
