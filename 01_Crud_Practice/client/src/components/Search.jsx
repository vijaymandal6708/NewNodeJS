import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const Search = () => {
    const [rollno,setRollno] = useState("");

    const handleInput = async (e)=>{
       setRollno(e.target.value);
    };

    const handleSearch = async ()=>{
       console.log(rollno);
       await axios.post("http://localhost:9000/student/search-student",{rollno});
    }

  return (
    <div align="center">
      <h1>This is the search page</h1>

      Enter Rollno: <input type="number" name="rollno" onChange={handleInput} /> <br /> <br />
      <button onClick={handleSearch}>Search Student</button>
    </div>
  )
}

export default Search
