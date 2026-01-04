import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToWishlist, increaseQuantity } from "../../cartSlice";
import { FaRegHeart } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Smartphones = () => {
  const [products, setProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [filters, setFilters] = useState({
    price: "",
    rating: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.mycart.cart);

  /* ===== LOAD DATA ===== */
  useEffect(() => {
    const loadSmartphones = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKENDURL}/product/product-display`
      );

      const smartphones = data.filter(
        (item) => item.category && item.category.toLowerCase().includes("phone")
      );

      setProducts(smartphones);
    };

    loadSmartphones();
  }, []);

  /* ===== BRANDS FROM PRODUCT NAME ===== */
  const brands = [...new Set(products.map((p) => p.name.split(" ")[0]))];

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  /* ===== FILTER LOGIC (PRICE ×10 FIXED) ===== */
  const filteredProducts = products.filter((item) => {
    let priceOk = true;
    let ratingOk = true;
    let brandOk = true;

    if (filters.price === "low") priceOk = item.price < 1500;
    if (filters.price === "mid")
      priceOk = item.price >= 1500 && item.price <= 3000;
    if (filters.price === "high") priceOk = item.price > 3000;

    if (filters.rating)
      ratingOk = Number(item.starRating || 0) >= Number(filters.rating);

    if (selectedBrands.length > 0) {
      const brand = item.name.split(" ")[0];
      brandOk = selectedBrands.includes(brand);
    }

    return priceOk && ratingOk && brandOk;
  });

  return (
    <>
      {/* ================= CSS ================= */}
      <style>{`
        body {
          margin: 0;
          background: #f3f3f3;
          font-family: system-ui, -apple-system, BlinkMacSystemFont;
        }

        /* ===== PAGE WRAPPER ===== */
        .category-page {
          max-width: 1522px;
          margin: auto;
          padding: 0 0px 0px; /* 🔥 header gap */
        }

        /* ===== BANNER ===== */
        
        .banner-container {
          background: #fff;                 /* white card background */
          border: 1px solid #ddd;            /* visible border */
          border-radius: 14px;               /* rounded corners */
          padding: 12px;                     /* gap between border & image */
          margin: 0 40px 30px;               /* spacing from page sides */
          box-shadow: 0 6px 18px rgba(0,0,0,0.08); /* subtle elevation */
        }

        .category-banner {
          height: 420px;
          background-image: url("/smartphone-banner.jpg");
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          border-radius: 10px;               /* inner rounding */
        }


        .section-header {
          text-align: center;
          margin: 30px 0 10px;
        }

        .section-header h2 {
          font-size: 26px;
          font-weight: 700;
          transform: skewX(-6deg);
          text-shadow: 2px 3px 6px rgba(0,0,0,.35);
        }

        .section-header p {
          font-size: 14px;
          color: #666;
          transform: skewX(-6deg);
        }

        /* ===== TITLE ===== */
        .page-title {
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .page-subtitle {
          font-size: 14px;
          color: #555;
          margin-bottom: 24px;
        }

        /* ===== LAYOUT ===== */
        .layout {
          display: grid;
          grid-template-columns: 210px 1fr;
          gap: 28px;
          padding: 0px 40px;
        }

        /* ===== FILTERS ===== */
        .filters {
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 18px;
          height: fit-content;
          position: sticky;
          top: 150px;
          width: 200px;
        }

        .filters h4 {
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .filter-group {
          margin-bottom: 22px;
        }

        .filter-group strong {
          display: block;
          font-size: 13px;
          margin-bottom: 8px;
        }

        .filter-group label {
          display: block;
          font-size: 13px;
          color: #222;
          margin-bottom: 6px;
          cursor: pointer;
        }

        /* ===== PRODUCTS GRID ===== */
        .products {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
          gap: 24px;
        }

        /* ===== PRODUCT CARD ===== */
        .product-card {
          background: #fff;
          border: 1px solid #e5e5e5;
          border-radius: 16px;
          cursor: pointer;
          transition: box-shadow 0.2s ease;
        }

        .product-card:hover {
          box-shadow: 0 4px 18px rgba(0,0,0,0.12);
        }

        .product-image {
          height: 220px;
          background: #f1f3f6;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
        }

        .product-image img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .product-info {
          padding: 14px 24px 22px;
        }

        .product-info h4 {
          font-size: 15.5px;
          font-weight: 600;
          line-height: 1.4;
          height: 40px;
          margin-bottom: 6px;
        }

        .rating {
          font-size: 13px;
          color: #f54064ff;
          margin-bottom: 2px;
        }

        .price-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }

        .price {
          font-size: 16px;
          font-weight: 700;
        }

        .mrp {
          font-size: 13px;
          color: #777;
          text-decoration: line-through;
        }

        .wishlist {
          margin-left: auto;
          margin-right: 8px;
          margin-top: -12px;
          cursor: pointer;
          font-size: 20px;
        }

        .add-cart-btn {
          width: 100%;
          background: linear-gradient(135deg, #020718ff, #131a3bff);
          color: white;
          padding: 8px;
          border-radius: 20px;
          font-size: 14px;
          cursor: pointer;
        }

        .add-cart-btn:hover {
          background: #101010d2;
        }
      `}</style>

      {/* ================= PAGE ================= */}
      <div className="category-page">
        <div className="banner-container">
          <div className="category-banner"></div>
        </div>

        <div className="section-header">
          <h2>Trending Smartphones</h2>
          <p>Top picks hand-selected for you</p>
        </div>

        <div className="layout">
          {/* ===== FILTERS ===== */}
          <div className="filters">
            <h4>Filters</h4>

            <div className="filter-group">
              <strong>Brand</strong>
              {brands.map((brand) => (
                <label key={brand}>
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                  />{" "}
                  {brand}
                </label>
              ))}
            </div>

            <div className="filter-group">
              <strong>Price</strong>
              <label>
                <input
                  type="radio"
                  name="price"
                  onChange={() => setFilters({ ...filters, price: "low" })}
                />{" "}
                Under ₹1,500
              </label>
              <label>
                <input
                  type="radio"
                  name="price"
                  onChange={() => setFilters({ ...filters, price: "mid" })}
                />{" "}
                ₹1,500 – ₹3,000
              </label>
              <label>
                <input
                  type="radio"
                  name="price"
                  onChange={() => setFilters({ ...filters, price: "high" })}
                />{" "}
                Above ₹3,000
              </label>
            </div>

            <div className="filter-group">
              <strong>Customer Rating</strong>
              <label>
                <input
                  type="radio"
                  name="rating"
                  onChange={() => setFilters({ ...filters, rating: "4" })}
                />{" "}
                4★ & above
              </label>
              <label>
                <input
                  type="radio"
                  name="rating"
                  onChange={() => setFilters({ ...filters, rating: "3" })}
                />{" "}
                3★ & above
              </label>
            </div>
          </div>

          {/* ===== PRODUCTS ===== */}
          <div className="products">
            {filteredProducts.map((item) => {
              const existingItem = cart.find(
                (cartItem) => cartItem.id === item._id
              );

              return (
                <div
                  key={item._id}
                  className="product-card"
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

                    <div className="price-row">
                      <span className="price">₹{item.price}</span>
                      <span className="mrp">₹{item.MRP}</span>

                      <FaRegHeart
                        className="wishlist"
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
                          toast.info("Quantity increased", { autoClose: 1200 });
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
                          toast.success("Item added to cart", {
                            autoClose: 1200,
                          });
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

export default Smartphones;
