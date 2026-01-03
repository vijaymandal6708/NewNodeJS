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
        (item) =>
          item.category &&
          item.category.toLowerCase().includes("phone")
      );

      setProducts(smartphones);
    };

    loadSmartphones();
  }, []);

  /* ===== BRANDS FROM PRODUCT NAME ===== */
  const brands = [...new Set(products.map(p => p.name.split(" ")[0]))];

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
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
        .category-banner {
          width: 1520px;
          height: 450px;
          background-image: url("/smartphone-banner.png");
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          margin-bottom: 24px;
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
          grid-template-columns: 260px 1fr;
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
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 26px;
        }

        /* ===== PRODUCT CARD ===== */
        .product-card {
          background: #fff;
          border: 1px solid #e5e5e5;
          border-radius: 6px;
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
          padding: 14px 16px 18px;
        }

        .product-info h4 {
          font-size: 14px;
          font-weight: 600;
          line-height: 1.4;
          height: 40px;
          overflow: hidden;
          margin-bottom: 6px;
        }

        .rating {
          font-size: 13px;
          color: #f5a623;
          margin-bottom: 6px;
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
          cursor: pointer;
        }

        .add-cart-btn {
          width: 100%;
          background: #ffd814;
          border: 1px solid #fcd200;
          color: #111;
          padding: 8px;
          border-radius: 20px;
          font-size: 14px;
          cursor: pointer;
        }

        .add-cart-btn:hover {
          background: #f7ca00;
        }
      `}</style>

      {/* ================= PAGE ================= */}
      <div className="category-page">
        <div className="category-banner"></div>

        <div className="page-title">Smartphones</div>
        <div className="page-subtitle">
          Compare prices, features & customer ratings
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
                        existingItem
                          ? dispatch(increaseQuantity(existingItem))
                          : dispatch(
                              addToCart({
                                id: item._id,
                                name: item.name,
                                price: item.price,
                                image: item.defaultImage,
                                qnty: 1,
                              })
                            );
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
