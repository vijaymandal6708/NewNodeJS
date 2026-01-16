import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <br />
      <header align="center">
        <Link to="/home"> Home | </Link>
        <Link to="/insert"> Insert | </Link>
        <Link to="/display"> Display | </Link>
        <Link to="/search"> Search | </Link>
      </header>

      <main>
        <Outlet></Outlet>
      </main>
    </>
  )
}

export default Layout
