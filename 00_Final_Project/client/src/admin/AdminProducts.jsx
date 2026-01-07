import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const admintoken = localStorage.getItem("admintoken");

        const res = await axios.get(
          "http://localhost:8000/admin/products",
          {
            headers: {
              Authorization: `Bearer ${admintoken}`,
            },
          }
        );

        setProducts(res.data.products);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          font-family: "Inter", system-ui, sans-serif;
        }

        body {
          background: #f4f6fb;
        }

        .page {
          max-width: 1400px;
          margin: auto;
          padding: 0px 30px 20px;
        }

        .title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 30px;
          text-align: center;
        }

        .table-container {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead {
          background: #0f172a;
          color: #fff;
        }

        th {
          padding: 16px 18px;
          font-size: 14px;
          font-weight: 600;
          text-align: left;
        }
        
        .product-text-heading{
          padding-left: 130px;
        }

        td {
          padding: 20px 18px;
          vertical-align: middle;
          border-bottom: 1px solid #eee;
          font-size: 14px;
        }

        tbody tr:hover {
          background: #f9fafb;
        }

        /* ===== PRODUCT CELL ===== */
        .product-cell {
          display: flex;
          align-items: center;
          gap: 26px;
          margin-left: 20px
        }

        .product-cell img {
          width: 60px;
          height: 60px;
          object-fit: contain;
          border-radius: 10px;
          background: #f1f1f1;
          padding: 6px;
        }

        .product-info {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .product-name {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }

        .sku {
          font-size: 12px;
          color: #6b7280;
        }

        .meta-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .badge {
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
        }

        .category {
          background: #e0e7ff;
          color: #3730a3;
        }

        .active {
          background: #dcfce7;
          color: #166534;
        }

        .out {
          background: #fee2e2;
          color: #b91c1c;
        }

        .price {
          font-weight: 600;
        }

        .stock {
          font-weight: 600;
        }

        /* ===== ACTIONS ===== */
        .edit-btn {
          padding: 8px 14px;
          border-radius: 8px;
          border: none;
          background: #0f172a;
          color: #fff;
          font-size: 13px;
          cursor: pointer;
        }

        .edit-btn:hover {
          background: #1e293b;
        }

        .empty {
          text-align: center;
          padding: 100px;
          color: #555;
          font-size: 16px;
        }
      `}</style>

      <div className="page">
        <h2 className="title">Products & Inventory</h2>

        {loading ? (
          <p className="empty">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="empty">No products found</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th className="product-text-heading">Product</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <div className="product-cell">
                        <img src={p.defaultImage} alt={p.name} />

                        <div className="product-info">
                          <div className="product-name">{p.name}</div>

                          <div className="sku">
                            SKU: GG-{p._id.slice(-6).toUpperCase()}
                          </div>

                          <div className="meta-row">
                            <span className="badge category">
                              {p.category}
                            </span>

                            <span
                              className={`badge ${
                                p.quantity === 0 ? "out" : "active"
                              }`}
                            >
                              {p.quantity === 0
                                ? "Out of Stock"
                                : "Active"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="price">₹{p.price}</td>

                    <td className="stock">{p.quantity}</td>

                    <td>
                      <button
                        className="edit-btn"
                        onClick={() =>
                          navigate(`/admin-dashboard/edit-product/${p._id}`)
                        }
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminProducts;
