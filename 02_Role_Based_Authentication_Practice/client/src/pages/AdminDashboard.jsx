import React from 'react';

const AdminDashboard = () => {

  const loadData = async () => {
    const token = localStorage.getItem("token");
    console.log(token);

    const response = await axios.get(
      "http://localhost:4000/user/user-dashboard-validate",
     
    );

    console.log(response.data);
}

  return (
    <>
      
    </>
  )
}

export default AdminDashboard
