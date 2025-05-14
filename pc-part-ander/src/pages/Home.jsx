import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom"; // ⬅️ import navigate

function Home() {
  const { addToCart } = useCart();
  const navigate = useNavigate(); // ⬅️ buat navigate

  const rekomendasiParts = [
    {
      nama: "Intel Core i7 13700K",
      harga: "Rp 5.500.000",
      img: "https://kkomputer.com/7077-thickbox_default/intel-core-i7-13700k-54-ghz-16c24t-lga-1700-rl.jpg",
    },
    {
      nama: "ASUS ROG STRIX RTX 4070",
      harga: "Rp 10.200.000",
      img: "https://dlcdnwebimgs.asus.com/files/media/A7B6F129-204B-4536-86E3-3F4023DB889F/v1/img/aura/aura-pd.png",
    },
    {
      nama: "Corsair Vengeance 16GB DDR5",
      harga: "Rp 1.800.000",
      img: "https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024,f_auto/products/Memory/vengeance-ddr5-blk-config/Gallery/Vengeance-DDR5-1UP-16GB-BLACK_07.webp",
    },
  ];

  return (
    <div className="home-container">
      <div className="home-welcome">
        <h2>
          Selamat datang di <span className="brand">Pc Part Ander</span>
        </h2>
        <p>Temukan komponen PC terbaik dengan harga terbaik.</p>
        <button
          onClick={() => navigate("/riwayat")}
          className="btn-riwayat"
          style={{
            marginTop: "1rem",
            padding: "10px 20px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Lihat Riwayat Transaksi
        </button>
      </div>

      <section className="rekomendasi-section">
        <h3>🔥 Rekomendasi Part PC</h3>
        <div className="rekomendasi-grid">
          {rekomendasiParts.map((part, index) => (
            <div className="part-card" key={index}>
              <img src={part.img} alt={part.nama} className="part-image" />
              <h4>{part.nama}</h4>
              <p className="part-harga">{part.harga}</p>
              <button
                className="btn-tambah"
                onClick={() =>
                  addToCart({
                    id: index + 1000,
                    title: part.nama,
                    price: parseInt(part.harga.replace(/[^\d]/g, "")) / 16000,
                    image: part.img,
                  })
                }
              >
                Tambah ke Keranjang
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
