import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToWishlist, increaseQuantity } from "../../cartSlice";
import { FaRegHeart } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Speakers = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.mycart.cart);

  useEffect(() => {
    const loadSpeakers = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKENDURL}/product/product-display`
      );

      const speakers = data.filter(
        (item) =>
          item.category &&
          item.category.toLowerCase().includes("speaker")
      );

      setProducts(speakers);
    };

    loadSpeakers();
  }, []);

  return (
    <>
      {/* ================= FULL PAGE CSS ================= */}
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #f4f6f8;
        }

        /* ===== FULL PAGE WRAPPER ===== */
        .speakers-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        .section-header {
          width: 100%;
          padding: 40px 80px 10px;
          text-align: center;
          margin-bottom: -30px;
        }

        .section-header h2 {
          font-size: 28px;
          font-weight: bold;
          color: #222;
          margin-bottom: 4px;
          /* subtle tilt (less than italic) */
          transform: skewX(-6deg);

          /* 👇 stronger, visible shadow */
           text-shadow:
          1px 1px 0 rgba(0,0,0,0.25),
          2px 3px 6px rgba(0,0,0,0.35);

          letter-spacing: 0.6px;
        }

        .section-header p {
          font-size: 14px;
          color: #666;
          /* subtle tilt (less than italic) */
          transform: skewX(-6deg);
        }


        .category-banner {
          width: 1530px;
          height: 65vh;
          background-image: url("/speaker-banner.png");
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          background-color: #f4f6f8;
          margin-top: 2px;
        }

        /* ===== PRODUCTS SECTION ===== */
        .products-section {
          flex: 1;
          width: 100%;
          max-width: 1400px;
          margin: auto;
          padding: 50px 10px;
        }

        .products-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 32px;
        }

        /* ===== PRODUCT CARD ===== */
        .product-card {
          background: #fff;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }

        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 40px rgba(0,0,0,0.18);
        }

        .product-image {
          height: 260px;
          background: #f1f3f6;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }

        .product-image img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .product-info {
          padding: 16px 24px 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .product-info h4 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 6px;
        }

        .rating {
          font-size: 14px;
          color: #f5b301;
          margin-bottom: 8px;
        }

        .price-box {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }

        .price {
          font-size: 18px;
          font-weight: 700;
          color: #4b0082;
        }

        .mrp {
          font-size: 14px;
          color: #999;
          text-decoration: line-through;
        }

        .offer {
          font-size: 13px;
        }

        .add-cart-btn {
          width: 100%;
          background: linear-gradient(135deg, #020718, #131a3b);
          border: none;
          color: white;
          padding: 10px 0;
          border-radius: 14px;
          cursor: pointer;
          font-size: 15px;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .products-section {
            padding: 30px 20px;
          }
        }
      `}</style>

      {/* ================= FULL PAGE ================= */}
      <div className="speakers-page">
        {/* ===== BANNER ===== */}
        <div className="category-banner"></div>

        <div className="section-header">
            <h2>Trending Speakers</h2>
            <p>Top picks hand-selected for you</p>
        </div>

        {/* ===== PRODUCTS ===== */}
        <div className="products-section">
          <div className="products-container">
            {products.map((item) => {
              const existingItem = cart.find(
                (cartItem) => cartItem.id === item._id
              );

              return (
                <div
                  className="product-card"
                  key={item._id}
                  onClick={() => navigate(`/product/${item._id}`)}
                >
                  <div className="product-image">
                    <img src={item.defaultImage} alt={item.name} />
                  </div>

                  <div className="product-info">
                    <h4>{item.name}</h4>

                    <div className="rating">
                      {"★".repeat(Math.floor(item.starRating || 0))}
                      {"☆".repeat(5 - Math.floor(item.starRating || 0))}
                    </div>

                    <div className="price-box">
                      <span className="price">₹{item.price}</span>
                      <span className="mrp">₹{item.MRP}</span>
                      <span className="offer">30% off</span>

                      <FaRegHeart
                        style={{ marginLeft: "auto" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(addToWishlist({ ...item, qnty: 1 }));
                          toast.info("Added to wishlist ❤️");
                        }}
                      />
                    </div>

                    <button
                      className="add-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation();

                        if (existingItem) {
                          dispatch(increaseQuantity(existingItem));
                          toast.info("Quantity increased");
                        } else {
                          dispatch(
                            addToCart({
                              id: item._id,
                              name: item.name,
                              price: item.price,
                              image: item.defaultImage,
                              qnty: 1,
                            })
                          );
                          toast.success("Item added to cart");
                        }
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <ToastContainer position="top-right" autoClose={1500} />
      </div>
    </>
  );
};

export default Speakers;
