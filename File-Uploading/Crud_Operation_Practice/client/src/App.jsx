import { useState } from "react";
import axios from "axios";


function App() {

    const [product,setProduct] = useState({});

    const handleInput=(e)=>{
       setProduct((prev)=>({...prev,[e.target.name]:e.target.value}));
    };

    const handleSubmit =async(e)=>{
       e.preventDefault();
       const response = await axios.post("http://localhost:8000/add-product", product);
    }
  
  return (
    <>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        product name :<input type="text" name="productName" onchange={handleInput} />
        product price :<input type="number" name="productPrice" onchange={handleInput} />

        <button type="submit">Add Product</button>
      </form>
    </>
  )
}

export default App
