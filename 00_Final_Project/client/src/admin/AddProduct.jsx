import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const [input, setInput] = useState({});
  const [images, setImages] = useState([]);

  const handleInput = (e) => {
    setInput((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      for (let key in input) {
        formData.append(key, input[key]);
      }

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      const admintoken = localStorage.getItem("admintoken");

      await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/admin/add-product`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${admintoken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Product added successfully");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Add product failed");
    }
  };

  return (
    <>
      {/* ================= TOAST ================= */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* ================= INLINE CSS ================= */}
      <style>{`
        :root {
          --primary: #5b21b6;
          --bg: #f6f7fb;
          --card: #ffffff;
          --text: #1f2937;
          --border: #e5e7eb;
        }

        .add-product-page {
          background: var(--bg);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px;
        }

        .page-title {
          font-size: 26px;
          font-weight: 600;
          margin-bottom: 45px;
          color: var(--text);
          text-align: center;
        }

        .product-form {
          background: var(--card);
          padding: 50px;
          border-radius: 16px;
          max-width: 900px;
          width: 100%;
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 6px;
          color: var(--text);
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 12px;
          border-radius: 10px;
          border: 1px solid var(--border);
          font-size: 14px;
          outline: none;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: var(--primary);
        }

        /* ===== CENTER FILE INPUT TEXT ===== */
        .file-input {
          text-align: center;
          cursor: pointer;
        }

        .file-input::file-selector-button {
          padding: 10px 16px;
          border-radius: 8px;
          border: none;
          background: var(--primary);
          color: #fff;
          cursor: pointer;
          margin-right: 12px;
        }

        .file-input::file-selector-button:hover {
          background: #4c1d95;
        }

        .full-width {
          margin-top: 20px;
        }

        .submit-btn {
          margin-top: 30px;
          background: var(--primary);
          color: #fff;
          border: none;
          padding: 14px 28px;
          font-size: 15px;
          font-weight: 500;
          border-radius: 12px;
          cursor: pointer;
          transition: 0.3s;
          width: 100%;
        }

        .submit-btn:hover {
          background: #4c1d95;
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }

          .add-product-page {
            padding: 20px;
          }

          .product-form {
            padding: 30px;
          }
        }
      `}</style>

      {/* ================= JSX ================= */}
      <div className="add-product-page">
        <form className="product-form" onSubmit={handleSubmit}>
          <h1 className="page-title">Add New Product</h1>

          <div className="form-grid">
            <div className="form-group">
              <label>Product Name</label>
              <input name="name" onChange={handleInput} required />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select name="category" onChange={handleInput} required>
                <option value="">Select category</option>
                <option>Smartphone</option>
                <option>Laptop</option> 
                <option>Speaker</option>
                <option>Camera</option>
              </select>
            </div>

            <div className="form-group">
              <label>Price (₹)</label>
              <input type="number" name="price" onChange={handleInput} required />
            </div>

            <div className="form-group">
              <label>MRP (₹)</label>
              <input type="number" name="MRP" onChange={handleInput} required />
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input type="number" name="quantity" onChange={handleInput} required />
            </div>

            <div className="form-group">
              <label>Initial star rating</label>
              <select name="starRating" onChange={handleInput} required>
                <option value="">Select rating</option>
                <option value="0">0 Star</option>
                <option value="0.5">0.5 Star</option>
                <option value="1">1 Star</option>
                <option value="1.5">1.5 Star</option>
                <option value="2">2 Star</option>
                <option value="2.5">2.5 Star</option>
                <option value="3">3 Star</option>
                <option value="3.5">3.5 Star</option>
                <option value="4">4 Star</option>
                <option value="4.5">4.5 Star</option>
                <option value="5">5 Star</option>
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label>Description</label>
            <textarea name="description" rows="3" onChange={handleInput}></textarea>
          </div>

          <div className="form-group full-width">
            <label>Product Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              className="file-input"
              onChange={handleImage}
            />
          </div>

          <button type="submit" className="submit-btn">
            Add Product
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
