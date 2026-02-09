import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <header>
        <Link to="/home">Home |</Link>
        <Link to="/register"> Register |</Link>
        <Link to="/login"> Login |</Link>
      </header>

      <main>
        <Outlet></Outlet>
      </main>
    </>
  )
}

export default MainLayout
