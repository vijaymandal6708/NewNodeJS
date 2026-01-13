import React, { useState } from 'react';
import axios from 'axios';

const Insert = () => {

    const [data,setData] = useState({});

    const handleInput = async (e)=>{
        setData (()=>({...data,[e.target.name]:e.target.value}));
        console.log(data);
    }

    const handleSubmit = async ()=>{
        await axios.post("http://localhost:9000/student/add-student", data);
        alert("Student added successfully");
    }

  return (
    <>
      <div align="center">
        <h2>This is the insert page</h2>
        <h2>Add new Student</h2> <br /> <br />

        Enter Name : <input type="text" name="name" onChange={handleInput} /> <br /> <br />
        Enter Rollno : <input type="text" name="rollno" onChange={handleInput} />  <br />  <br />

        <button onClick={handleSubmit}>Add student</button>
      </div> 
    </>
  )
}

export default Insert
