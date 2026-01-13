import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Display = () => {

    const [data,setData] = useState([]);

    const loadData = async ()=>{
        const response = await axios.get("http://localhost:9000/student/display-student");
        setData(response.data);
        console.log(response.data);
    };

    useEffect(()=>{
        loadData();
    },[]);

  return (
    <div>
        <br /> <br /> <br />
       <table border={1} align="center">
        <thead>
            <tr>
                <th>Name : </th>
                <th>Roll no : </th>
            </tr>
        </thead>
        <tbody>
            {
                data.map((data,index)=>(
                    <tr key={index}>
                        <td>{data.name}</td>
                        <td>{data.rollno}</td>
                    </tr>
                ))
            }
        </tbody>
       </table>
    </div>
  )
}

export default Display
