import { useCart } from "../context/CartContext"; // sesuaikan path
import { useNavigate } from "react-router-dom";
import "./Keranjang.css";

export default function Keranjang() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity * 16000,
      0
    );

    const transaksi = {
      items: cartItems,
      total,
    };

    clearCart(); // opsional
    navigate("/pembayaran", { state: { transaksi } });
  };

  return (
    <div className="keranjang-container">
      <h2>Keranjang Belanja</h2>
      {cartItems.length === 0 ? (
        <p>Keranjang masih kosong.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div className="keranjang-item" key={item.id}>
              {/* Jika ada image, tampilkan */}
              {item.image && <img src={item.image} alt={item.title} />}
              <div className="keranjang-info">
                <h3>{item.title}</h3>
                <p>Rp {(item.price * 16000).toLocaleString()}</p>
                <div className="quantity-control">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="hapus-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
