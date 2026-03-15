import { useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({});
  const [image, setImage] = useState(null);

  const handleInput = async (e) => {
    console.log(e.target.value);
    setForm((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleImage = async (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("productName", form.productName);
    formData.append("productPrice", form.productPrice);
    formData.append("image", image);

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    await axios.post("http://localhost:8000/add-product", formData);
  };
  return (
    <>
      <form style={{ padding: "200px 400px" }} onSubmit={handleSubmit}>
        name : <input type="text" name="productName" onChange={handleInput} />{" "}
        <br /> <br />
        price :{" "}
        <input type="number" name="productPrice" onChange={handleInput} />{" "}
        <br /> <br />
        <input type="file" onChange={handleImage} /> <br /> <br />
        <button type="submit">Add product</button>
      </form>
    </>
  );
}

export default App;
