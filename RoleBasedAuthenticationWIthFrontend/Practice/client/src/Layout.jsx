import React from 'react'
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <header align="center">
        <Link to="/register">Register | </Link>
        <Link to="login">Login | </Link>
      </header> 

      <main align="center">
        <Outlet ></Outlet>
      </main>
    </>
  )
}

export default Layout
