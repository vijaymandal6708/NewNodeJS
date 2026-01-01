import { Route, Routes } from "react-router-dom";

/* ===== LAYOUTS ===== */
import Layout from "./Layout";
import Layout2 from "./Layout2";

/* ===== USER PAGES ===== */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderConfirmation from "./pages/OrderConfirmation";

/* ===== ADMIN ===== */
import AdminDashboard from "./admin/AdminDashboard";
import AddProduct from "./admin/AddProduct";
import AdminOrders from "./admin/AdminOrders";
import AdminProducts from "./admin/AdminProducts";

import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
    <ScrollToTop></ScrollToTop>

    <Routes>
      {/* ================= USER WEBSITE ================= */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="order-confirmation" element={<OrderConfirmation />} />
        <Route path="orders" element={<Orders />} />

        {/* ================= ADMIN ================= */}
        <Route path="admin-dashboard" element={<AdminDashboard />}>
          <Route path="add-product" element={<AddProduct />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>
      </Route>

      {/* ================= AUTH (NO HEADER / FOOTER) ================= */}
      <Route path="/login" element={<Layout2 />}>
        <Route index element={<Login />} />
      </Route>

      <Route path="/signup" element={<Layout2 />}>
        <Route index element={<Signup />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
