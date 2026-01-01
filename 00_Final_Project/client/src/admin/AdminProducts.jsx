import { useEffect, useState } from "react";
import axios from "axios";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/admin/products"
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
          background: #f6f7fb;
        }

        .page {
          max-width: 1200px;
          margin: auto;
          padding: 30px 20px 60px;
        }

        .title {
          font-size: 26px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 30px;
        }

        .table-container {
          background: #fff;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead {
          background: #0f172a;
          color: #fff;
        }

        th, td {
          padding: 14px 16px;
          text-align: left;
          font-size: 14px;
        }

        tbody tr {
          border-bottom: 1px solid #eee;
        }

        tbody tr:last-child {
          border-bottom: none;
        }

        .product-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .product-cell img {
          width: 45px;
          height: 45px;
          object-fit: contain;
          border-radius: 6px;
          background: #f1f1f1;
        }

        .stock {
          font-weight: 600;
        }

        .low {
          color: #d93025;
        }

        .ok {
          color: #1f9d55;
        }

        .empty {
          text-align: center;
          padding: 80px;
          color: #555;
        }
      `}</style>

      <div className="page">
        <h2 className="title">Products & Stock</h2>

        {loading ? (
          <p className="empty">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="empty">No products found</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                </tr>
              </thead>

              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <div className="product-cell">
                        <img src={p.defaultImage} alt={p.name} />
                        <span>{p.name}</span>
                      </div>
                    </td>

                    <td>{p.category}</td>

                    <td>₹{p.price}</td>

                    <td
                      className={`stock ${
                        p.quantity <= 5 ? "low" : "ok"
                      }`}
                    >
                      {p.quantity}
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
