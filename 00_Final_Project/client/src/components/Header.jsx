import { Link, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();
  const cartData = useSelector((state) => state.mycart.cart);
  const wishlistData = useSelector((state) => state.mycart.wishlist);

  const cartLength = cartData.length;
  const wishlistLength = wishlistData.length;

  const debounceRef = useRef(null);

  // 🔍 Auto-suggest (NO layout impact)
  useEffect(() => {
    if (!searchText.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKENDURL}/product/search?q=${searchText}`
        );
        setSuggestions(data);
        setShowSuggestions(true);
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [searchText]);

  const handleSearch = () => {
    if (!searchText.trim()) return;
    setShowSuggestions(false);
    navigate(`/search?q=${searchText}`);
  };

  const handleSelect = (id) => {
    setShowSuggestions(false);
    setSearchText("");
    navigate(`/product/${id}`);
  };

  return (
    <>
      <style>{`
        * {
          font-family: sans-serif;
          box-sizing: border-box;
        }

        .header-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 2000;
          background: white;
}


        .top-header-container {
          height: 65px;
          display: flex;
          padding: 12px 225px;
          align-items: center;
          justify-content: space-between;
        }

        .left-container {
          display: flex;
          align-items: center;
          gap: 25px;
          font-size: 14px;
        }

        .logo {
          height: 40px;
          width: 190px;
          display: flex;
          font-weight: 900;
          font-size: 20px;
          padding-top: 5px;
          margin-left: -10px;
          cursor: pointer;
        }

        .circle {
          height: 17px;
          width: 17px;
          background: #0987f5cf;
          border-radius: 50%;
          position: relative;
          top: -3px;
          left: 10px;
          opacity: 0.4;
        }

        .left-container a {
          text-decoration: none;
          color: black;
          font-weight: 500;
          font-style: italic;
        }

        .right-container {
          display: flex;
          height: 100%;
          width: 90px;
        }

        .wishlist-container,
        .cart-container {
          height: 100%;
          width: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: pointer;
        }

        .wishlist-container span,
        .cart-container span {
          position: absolute;
          top: -2px;
          right: -2px;
          font-size: 11px;
          background: red;
          color: white;
          border-radius: 50%;
          padding: 2px 6px;
          line-height: 1;
          z-index: 2;
        }

        .wishlist-container svg,
        .cart-container svg {
          font-size: 20px;
        }

        .bottom-header-container {
          display: flex;
          padding: 17px 220px;
          background: #0c0243;
          gap: 25px;
        }

        .bottom-header-container a {
          color: white;
          text-decoration: none;
          font-weight: 600;
          margin-top: 3px;
        }

        /* ===== SEARCH BAR (UNCHANGED) ===== */
        .search-bar {
          height: 35px;
          width: 700px;
          border-radius: 5px;
          background: white;
          display: flex;
          align-items: center;
          font-size: 14px;
          margin-right: 430px;
          overflow: visible;     /* 🔑 allow dropdown */
          position: relative;    /* 🔑 anchor dropdown */
        }

        .search-icon {
          font-size: 18px;
          padding-left: 10px;
        }

        .search-bar input {
          flex: 1;
          border: none;
          padding: 5px 15px;
          outline: none;
        }

        .search-button {
          height: 35px;
          width: 80px;
          background-color: red;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        /* ===== AUTOSUGGEST (NEW, NO LAYOUT SHIFT) ===== */
        .suggestions {
          position: absolute;
          top: 38px;
          left: 0;
          width: 100%;
          background: white;
          border-radius: 6px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.25);
          z-index: 9999;
          max-height: 250px;
          overflow-y: auto;
        }

        .suggestion-item {
          padding: 10px 16px;
          cursor: pointer;
          font-size: 14px;
          color: #222;
          border-bottom: 1px solid #eee;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .suggestion-item:hover {
          background: #f5f5f5;
        }

        .profile {
          width: 35px;
          background-color: white;
          aspect-ratio: 1 / 1;
          border-radius: 50%;
          flex-shrink: 0;
        }
      `}</style>

      <div className="header-container">
        <div className="top-header-container">
          <div className="left-container">
            <div className="logo" onClick={() => navigate("/home")}>
              <div className="circle"></div>
              <p>.Gadget Galaxy</p>
            </div>

            <Link to="/home">Home</Link>
            <Link to="/categories/smartphones">Smartphones</Link>
            <Link to="/categories/laptops">Laptops</Link>
            <Link to="/categories/speakers">Speakers</Link>
            <Link to="/categories/cameras">Cameras</Link>
          </div>

          <div className="right-container">
            <div className="wishlist-container">
              <span>{wishlistLength}</span>
              <FaRegHeart />
            </div>

            <div className="cart-container" onClick={() => navigate("/cart")}>
              <span>{cartLength}</span>
              <FiShoppingCart />
            </div>
          </div>
        </div>

        <div className="bottom-header-container">
          <div
            className="search-bar"
            onMouseEnter={() => {
              if (searchText && suggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
          >
            <div className="search-icon">
              <IoSearchOutline />
            </div>

            <input
              type="text"
              placeholder="Search products"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onFocus={() => searchText && setShowSuggestions(true)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

            <div className="search-button" onClick={handleSearch}>
              Search
            </div>

            {showSuggestions && suggestions.length > 0 && (
              <div
                className="suggestions"
                onMouseLeave={() => setShowSuggestions(false)}
              >
                {suggestions.map((item) => (
                  <div
                    key={item._id}
                    className="suggestion-item name-only"
                    onMouseDown={() => handleSelect(item._id)}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link to="/login">Login</Link>
          <div className="profile"></div>
        </div>
      </div>
    </>
  );
};

export default Header;
