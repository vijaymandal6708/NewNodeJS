import React, { useEffect, useState } from 'react';
import axios from "axios";

const Display = () => {
    const [products,setProducts] = useState([]);
    const [editProduct,setEditProduct] = useState({});

    const loadData=async()=>{
        const response = await axios.get("http://localhost:8000/product/get-products");
        setProducts(response.data);
    };

    const handleEdit=(product)=>{
        setEditProduct(product);
        console.log(product);
    };

    const handleInput=(e)=>{
        setEditProduct((prev)=>({...prev,[e.target.name]:e.target.value}));
        console.log(editProduct);
    };

    useEffect(()=>{
        loadData();
    },[]);

  return (
    <div>
      <h2>Student table</h2>
      <table border={1}>
        <thead>
            <tr>
               <th>productName</th>
               <th>productPrice</th>
               <th>Edit</th>
               <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {
            products.map((product,index)=>(
                <tr key={product._id}>
                    <td>{product.productName}</td>
                    <td>{product.productPrice}</td>
                    <td>
                        <button onClick={()=>{handleEdit(product)}}>Edit</button>
                    </td>
                </tr>
            ))
            }
        </tbody>
      </table>
      {editProduct._id && (
        <form>
            product name : <input type="text" value={editProduct.productName} name="productName" onChange={handleInput} />
            product price : <input type="text" value={editProduct.productPrice} name="productPrice" onChange={handleInput} />
        </form>
      )}
    </div>
  )
}

export default Display
