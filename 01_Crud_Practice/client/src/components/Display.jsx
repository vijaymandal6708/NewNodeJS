import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Display = () => {

    const [data,setData] = useState([]);

    const loadData = async ()=>{
        const response = await axios.get("http://localhost:9000/student/display-student");
        setData(response.data);
        console.log(response.data);
    };

    const handleDelete = async ()=>{
        console.log();
        await axios.delete(`http://localhost:9000/student/delete-student/${data._id}`);
    }

    useEffect(()=>{
        loadData();
    },[]);

  return (
    <div>
        <br /> <br /> <br />
       <table border={1} align="center">
        <thead>
            <tr>
                <th>Name</th>
                <th>Roll no</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {
                data.map((data,index)=>(
                    <tr key={index}>
                        <td>{data.name}</td>
                        <td>{data.rollno}</td>
                        <td><button>Edit</button></td>
                        <td><button onClick={handleDelete}>Delete</button></td>
                    </tr>
                ))
            }
        </tbody>
       </table>
    </div>
  )
}

export default Display
