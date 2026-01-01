import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductDetail = () => {
  const [data, setData] = useState({});
  const [activeImage, setActiveImage] = useState("");

  const loadData = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKENDURL}/product/product-detail`
    );
    setData(response.data);
    setActiveImage(response.data.defaultImage);
  };

  useEffect(() => {
    loadData();
  }, []);

  const starRating = parseFloat(data.starRating) || 0;

  return (
    <div
      className="main-container"
      style={{ padding: "30px 70px", height: "83vh", width: "100vw" }}
    >
      <div
        className="detail-container"
        style={{
          background: "white",
          minHeight: "78vh",
          borderRadius: "25px",
          padding: "25px 60px",
          display: "flex",
        }}
      >
        <div
          className="image-container"
          style={{
            height: "520px",
            width: "37vw",
            display: "flex",
          }}
        >
          <div className="thumb" style={{ height: "520px", width: "22%",paddingTop:"20px",paddingRight:"15px",paddingLeft:"15px"}}>
            {data.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setActiveImage(img)}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  marginBottom: "20px",
                  cursor: "pointer",
                  border:
                    activeImage === img
                      ? "2px solid rgba(95,35,198,1)"
                      : "1px solid lightgrey",
                  borderRadius: "8px",
                }}
              />
            ))}
          </div>
          <div
            className="main-image"
            style={{
              height: "519px",
              width: "78%",
              padding: "50px 20px",
              background: "rgba(0, 0, 0, 0.07)",
              border: "8px solid white",
              boxSizing: "border-box",
              borderRadius: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={activeImage}
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
        <div
          className="description"
          style={{
            height: "520px",
            width: "48vw",
            paddingTop: "30px",
            paddingBottom: "30px",
            paddingLeft: "60px",
            paddingRight: "10px",
          }}
        >
          <h2 style={{ fontWeight: "bolder", fontSize: "34px" }}>
            {data.name}
          </h2>
          <div
            className="rating"
            style={{
              color: "rgba(237, 184, 48, 1)",
              fontSize: "18px",
              margin: "15px",
            }}
          >
            {"★".repeat(Math.floor(starRating))}
            {starRating % 1 >= 0.5 && "⯪"}
            {"☆".repeat(
              5 - Math.floor(starRating) - (starRating % 1 >= 0.5 ? 1 : 0)
            )}
            <span
              style={{ marginLeft: "15px", color: "black", fontSize: "14px" }}
            >
              {starRating} stars
            </span>
          </div>
          <div
            className="price"
            style={{
              height: "30px",
              width: "500px",
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
              marginBottom: "25px",
            }}
          >
            <span
              style={{
                fontSize: "22px",
                fontWeight: "700",
                color: "rgba(95, 35, 198, 1)",
              }}
            >
              ₹{data.price}
            </span>
            <span
              style={{
                marginLeft: "20px",
                fontSize: "17px",
                textDecoration: "line-through",
              }}
            >
              ₹{data.MRP}
            </span>
            <span
              style={{
                marginLeft: "20px",
                fontSize: "15px",
                color: "rgba(34, 126, 66, 1)",
                fontWeight: "bolder",
              }}
            >
              30% OFF
            </span>
          </div>
          <div
            className="description"
            style={{ wordSpacing: "0.3px", marginBottom: "20px" }}
          >
            {data.description}
          </div>
          <p
            style={{
              color: "rgba(34, 126, 66, 1)",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "5px",
              marginLeft: "5px",
            }}
          >
            ✔ In stock • Free delivery • Easy returns
          </p>
          <p
            style={{
              color: "rgba(80, 80, 80, 1)",
              fontSize: "14px",
              marginLeft: "3px",
              marginBottom: "25px",
            }}
          >
            🛡 1-year warranty • Secure payments • 7-day replacement
          </p>

          <div
            className="quantity"
            style={{ marginBottom: "30px", marginLeft: "20px" }}
          >
            <button
              style={{
                padding: "3px 13px",
                marginRight: "15px",
                borderRadius: "5px",
                paddingBottom: "5px",
                border: "1px solid lightgrey",
              }}
            >
              -
            </button>
            <span>1</span>
            <button
              style={{
                padding: "3px 11px",
                marginLeft: "15px",
                borderRadius: "5px",
                paddingBottom: "5px",
                border: "1px solid lightgrey",
              }}
            >
              +
            </button>
          </div>
          <div
            className="action-buttons"
            style={{
              display: "flex",
              height: "40px",
              width: "640px",
              gap: "30px",
            }}
          >
            <div
              className="add-to-cart"
              style={{
                height: "40px",
                width: "290px",
                border: "1px solid black",
                borderRadius: "11px",
                color: "white",
                background: "rgba(95,35,198,1)",
                padding: "6px 100px",
              }}
            >
              Add to Cart
            </div>
            <div
              className="add-to-cart"
              style={{
                height: "40px",
                width: "290px",
                border: "1px solid black",
                borderRadius: "11px",
                color: "white",
                background: "rgba(7, 2, 16, 1)",
                padding: "6px 112px",
              }}
            >
              Buy Now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
