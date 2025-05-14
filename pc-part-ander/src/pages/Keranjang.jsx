import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Keranjang.css";

function Keranjang() {
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

    clearCart(); // opsional: kalau mau clear setelah checkout
    navigate("/pembayaran", { state: { transaksi } }); // <-- penting!
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
              <img src={item.image} alt={item.title} />
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

export default Keranjang;
