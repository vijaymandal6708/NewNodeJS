import { Link, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const cartData = useSelector((state) => state.mycart.cart);
  const wishlistData = useSelector((state) => state.mycart.wishlist);

  const cartLength = cartData.length;
  const wishlistLength = wishlistData.length;

  return (
    <>
      {/* ===== CSS IN SAME FILE (ONLY CART/WISHLIST FIX) ===== */}
      <style>{`
        * {
          font-family: sans-serif;
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

        .left-container a:hover {
          color: #6a0dad;
        }

        .right-container {
          display: flex;
          // border: 1px solid black;
          height: 100%;
          width: 90px;
        }

        /* 🔧 ONLY FIXED PART */
        .wishlist-container,
        .cart-container {
          height: 100%;
          width: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          // border: 1px solid black;
          position: relative; /* anchor for badge */
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
          position: relative;
          z-index: 1;
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

        .search-bar {
          height: 35px;
          width: 700px;
          border-radius: 5px;
          background: white;
          display: flex;
          align-items: center;
          font-size: 14px;
          margin-right: 430px;
        }

        .search-icon {
          font-size: 18px;
          padding-left: 10px;
        }

        .search-bar input {
          width: 422px;
          border: none;
          padding: 5px 15px;
        }

        .search-button {
          height: 35px;
          width: 80px;
          background-color: red;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }

        .profile {
          width: 35px;
          background-color: white;
          aspect-ratio: 1 / 1;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

      `}</style>

      {/* ===== JSX ===== */}
      <div className="header-container">
        <div className="top-header-container">
          <div className="left-container">
            <div className="logo">
              <div className="circle"></div>
              <p>.Gadget Galaxy</p>
            </div>

            <Link to="/home">Home</Link>
            <Link to="/home">Smartphones</Link>
            <Link to="/home">Laptops</Link>
            <Link to="/home">Accessories</Link>
            <Link to="/home">Cameras</Link>
          </div>

          <div className="right-container">
            <div className="wishlist-container">
              <span>{wishlistLength}</span>
              <FaRegHeart />
            </div>

            <div className="cart-container">
              <span>{cartLength}</span>
              <FiShoppingCart onClick={() => navigate("/cart")} />
            </div>
          </div>
        </div>

        <div className="bottom-header-container">
          <div className="search-bar">
            <div className="search-icon">
              <IoSearchOutline />
            </div>
            <input type="text" placeholder="Search products" />
            <div className="search-button">Search</div>
          </div>

          <Link to="/login">Login</Link>
          <div className="profile"></div>
        </div>
      </div>
    </>
  );
};

export default Header;
