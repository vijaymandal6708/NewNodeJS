import React from 'react';
import {Link, Outlet} from "react-router-dom";

const Layout = () => {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"100px",flexDirection:"column"}}>
      <header>
        <Link to="/signup">Signup | </Link>
        <Link to="/login"> Login | </Link>
        <Link to="/dashboard">Dashboard</Link>
      </header>
      <br /> <br />

      <main>
        <Outlet></Outlet>
      </main>
    </div>
  )
}

export default Layout
