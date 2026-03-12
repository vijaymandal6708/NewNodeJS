import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({});
  const [image, setImage] = useState(null);

  const handleInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("stars", form.stars);
    formData.append("description", form.description);
    formData.append("image", image);

    await axios.post("http://localhost:5000/add-product", formData);

    loadProducts();
  };

  const loadProducts = async () => {
    const res = await fetch("http://localhost:5000/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div style={{ padding:"40px",display:"flex",flexDirection:"column",alignItems:"center" }}>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", width:"300px"}}>
        <input name="name" placeholder="Product Name" onChange={handleInput} />

        <input name="price" placeholder="Price" onChange={handleInput} />

        <input name="stars" placeholder="Stars" onChange={handleInput} />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleInput}
        />

        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <button>Add Product</button>
      </form>

      <hr />

      {products.map((p) => (
        <div key={p._id} style={{ marginBottom: "30px" }}>
          <img src={p.image} width="200" />

          <h3>{p.name}</h3>

          <p>Price: {p.price}</p>

          <p>Stars: {p.stars}</p>

          <p>{p.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
