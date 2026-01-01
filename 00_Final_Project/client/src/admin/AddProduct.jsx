import "./AddProduct.css";
import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [input, setInput] = useState({});
  const [images, setImages] = useState([]);

  const handleInput = (e) => {
    console.log(e.target.value);
    setInput(values=>({...values, [e.target.name]:e.target.value}))
  };

  const handleImage=(e)=>{
    console.log(e.target.files);
    setImages(e.target.files);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData=new FormData();

    for(let key in input){
      formData.append(key, input[key]);
    }

    for(var i=0; i<images.length; i++){
      formData.append('images', images[i])
    }

    const response=await axios.post(`${import.meta.env.VITE_BACKENDURL}/admin/add-product`,formData);
    console.log(response);
  };

  return (
    <div className="add-product-page" align="center" >
      <h1 className="page-title">Add New Product</h1>

      <form className="product-form" onSubmit={handleSubmit}>
        
        <div className="form-grid">

          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              onChange={handleInput}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="category" onChange={handleInput} required>
              <option value="">Select category</option>
              <option>Smartphones</option>
              <option>Cameras</option>
              <option>Laptops</option>
              <option>Speakers</option>
              <option>SmartTV</option>
            </select>
          </div>

          <div className="form-group">
            <label>MRP (₹)</label>
            <input
              type="number"
              name="MRP"
              placeholder="Enter MRP"
              onChange={handleInput}
              required
            />
          </div>

          <div className="form-group">
            <label>Price (₹)</label>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              onChange={handleInput}
              required
            />
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              placeholder="Enter quantity"
              onChange={handleInput}
              required
            />
          </div>

          <div className="form-group">
            <label>Initial star rating</label>
            <select name="starRating" onChange={handleInput} required>
              <option value="">Select category</option>
              <option>0 Star</option>
              <option>0.5 Star</option>
              <option>1 Star</option>
              <option>1.5 Star</option>
              <option>2 Star</option>
              <option>2.5 Star</option>
              <option>3 Star</option>
              <option>3.5 Star</option>
              <option>4 Star</option>
              <option>4.5 Star</option>
              <option>5 Star</option>
            </select>
          </div>

        </div>

        <div className="form-group full-width">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Enter product description"
            rows="2"
            onChange={handleInput}
          ></textarea>
        </div>

        <div className="form-group full-width">
          <label>Product Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            multiple
            onChange={handleImage}
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Product
        </button>

      </form>
    </div>
  );
};

export default AddProduct;
