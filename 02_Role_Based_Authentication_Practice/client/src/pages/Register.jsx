import React, { useState } from 'react'

const Register = () => {

   const [data,setData] = useState({});

   const handleInput = async (e)=>{
      console.log(data);
      setData(()=>({...data,[e.target.name]:e.target.value}));
   };

   const handleSubmit = async ()=>{
    console.log(data);
   }

  return (
    <>
      <h1>This is the register page</h1>

      <form onSubmit={handleSubmit}>
        Enter name : <input type="text" name="name" onChange={handleInput} /> <br /> <br />
        Enter email : <input type="email" name="email" onChange={handleInput} /> <br /> <br />
        Enter password : <input type="password" name="password" onChange={handleInput} /> <br /> <br />

        <button type="submit">Register</button>
      </form>
    </>
  )
}

export default Register
