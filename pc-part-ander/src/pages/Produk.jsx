import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const API_URL = "http://127.0.0.1:6543/products";

export default function Produk() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  function fetchProducts() {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => alert("Gagal ambil data produk: " + err))
      .finally(() => setLoading(false));
  }

  function addProduct() {
    const newProduct = {
      title: "Produk Baru",
      description: "Deskripsi produk baru",
      price: 100000,
      quantity: 1,
    };

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((created) => {
        setProducts((prev) => [...prev, created]);
      })
      .catch((err) => alert("Gagal tambah produk: " + err));
  }

  function editProduct(id, field, value) {
    const updatedProducts = products.map((p) => {
      if (p.id === id) {
        let updatedValue = value;
        if (field === "price" || field === "quantity") {
          const num = Number(value);
          updatedValue = isNaN(num) ? 0 : num;
        }
        return { ...p, [field]: updatedValue };
      }
      return p;
    });
    setProducts(updatedProducts);

    // Update backend
    const productToUpdate = updatedProducts.find((p) => p.id === id);
    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productToUpdate),
    }).catch(() => alert("Gagal update produk"));
  }

  function deleteProduct(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal hapus produk");
        setProducts((prev) => prev.filter((p) => p.id !== id));
      })
      .catch((err) => alert(err));
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Daftar Produk</h2>
      <button onClick={addProduct} style={{ marginBottom: 15 }}>
        Tambah Produk Baru
      </button>

      {loading ? (
        <p>Loading produk...</p>
      ) : products.length === 0 ? (
        <p>Belum ada produk.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
            gap: 20,
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: 15,
                boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <input
                type="text"
                value={product.title}
                onChange={(e) =>
                  editProduct(product.id, "title", e.target.value)
                }
                style={{ width: "100%", fontWeight: "bold" }}
              />
              <textarea
                value={product.description}
                onChange={(e) =>
                  editProduct(product.id, "description", e.target.value)
                }
                style={{ width: "100%", marginTop: 8, resize: "vertical" }}
              />
              <input
                type="number"
                value={product.price}
                onChange={(e) =>
                  editProduct(product.id, "price", e.target.value)
                }
                min={0}
                style={{ width: "100%", marginTop: 8 }}
              />
              <input
                type="number"
                value={product.quantity}
                onChange={(e) =>
                  editProduct(product.id, "quantity", e.target.value)
                }
                min={1}
                style={{ width: "100%", marginTop: 8 }}
              />

              <button
                onClick={() => addToCart(product)}
                style={{
                  marginTop: 10,
                  backgroundColor: "green",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  cursor: "pointer",
                  borderRadius: 4,
                }}
              >
                Tambah ke Keranjang
              </button>

              <button
                onClick={() => deleteProduct(product.id)}
                style={{
                  marginTop: 10,
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  cursor: "pointer",
                  borderRadius: 4,
                  marginLeft: 10,
                }}
              >
                Hapus Produk
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
