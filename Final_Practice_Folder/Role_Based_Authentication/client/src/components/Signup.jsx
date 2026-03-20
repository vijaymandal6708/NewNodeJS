import React, { useState } from 'react'

const Signup = () => {

     const [user,setUser] = useState({});

     const handleInput =(e)=>{
        setUser((prev)=>({...prev,[e.target.name]:e.target.value}));
     };

     const handleSubmit =async(e)=>{
        e.preventDefault();
        console.log(user);
        await axios.post("http://localhost:8000/user/signup", user);
     }

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
         enter name : <input type="text" name="username" onChange={handleInput} />
         enter email : <input type="text" name="email" onChange={handleInput} />
         enter password : <input type="text" name="password" onChange={handleInput} />

         <button type="submit">Signup</button>
      </form>
    </div>
  )
}

export default Signup
