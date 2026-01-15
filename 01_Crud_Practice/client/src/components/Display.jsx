import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Display = () => {

    const [data,setData] = useState([]);
    const [editData,setEditData] = useState({});

    const loadData = async ()=>{
        const response = await axios.get("http://localhost:9000/student/display-student");
        setData(response.data);
        console.log(response.data);
    };

    const handleDelete = async (id)=>{
        console.log(id);
        await axios.delete(`http://localhost:9000/student/delete-student/${id}`);
        loadData();
    };

    const handleEdit = async (id) =>{
        console.log(id);
        const response = await axios.get(`http://localhost:9000/student/open-edit-form/${id}`);
        setEditData(response.data);
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
                        <td><button onClick={()=>{handleEdit(data._id)}}>Edit</button></td>
                        <td><button onClick={()=>{handleDelete(data._id)}}>Delete</button></td>
                    </tr>
                ))
            }
        </tbody>
       </table>
       <br /> <br /> <br />

       {
        editData._id && <form>
            Student Name : <input type="text" name="name" value={editData.name} />
        </form>
       }
    </div>
  )
}

export default Display
