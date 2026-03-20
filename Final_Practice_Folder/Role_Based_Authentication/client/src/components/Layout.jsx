import React from 'react';
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div style={{padding:"100px 200px"}}>
      <header>
        <Link to="/signup">Signup | </Link>
        <Link to="/login">Login | </Link>
        <Link to="/dashboard"> Dashboard</Link>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  )
}

export default Layout
