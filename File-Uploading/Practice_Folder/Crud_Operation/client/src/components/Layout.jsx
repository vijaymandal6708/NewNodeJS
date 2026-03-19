import React from 'react';
import { Link, Outlet } from 'react-router-dom';


const Layout = () => {
  return (
    <> 
      <header style={{padding:"2vw 4vw"}}>
        <Link to="/insert">Insert | </Link>
        <Link to="/display">Display | </Link>
        <Link to="/search">Search </Link>
      </header>
      <main style={{padding:"6vw 40vw"}}>
        <Outlet></Outlet>
      </main>
    </>
  )
}

export default Layout
