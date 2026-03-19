import React, { useState } from "react";
import axios from "axios";

const Insert = () => {

     const [product,setProduct] = useState({});

     const handleInput =(e)=>{
        setProduct((prev)=>({...prev,[e.target.name]:e.target.value}));
     };

     const handleSubmit =async(e)=>{
        e.preventDefault();

        console.log(product);
        await axios.post("http://localhost:8000/product/add-product", product);
     }

  return (
    <>
      <div>
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit} >
          product name : <input type="text" name="productName" onChange={handleInput} /> <br /> <br />
          product name : <input type="number" name="productPrice" onChange={handleInput} /> <br /> <br />
          <button type="submit">Add Product</button>
        </form>
      </div>
    </>
  );
};

export default Insert;
