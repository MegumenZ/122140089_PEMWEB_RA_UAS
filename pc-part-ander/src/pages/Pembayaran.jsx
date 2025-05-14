import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Pembayaran.css";

function Pembayaran() {
  const navigate = useNavigate();
  const location = useLocation();
  const transaksi = location.state?.transaksi;
  const [metode, setMetode] = useState("e-wallet");

  const handleBayar = () => {
    const riwayat = JSON.parse(localStorage.getItem("riwayatTransaksi")) || [];
    const transaksiBaru = {
      id: Date.now(),
      ...transaksi,
      metode,
      tanggal: new Date().toLocaleString(),
    };
    riwayat.push(transaksiBaru);
    localStorage.setItem("riwayatTransaksi", JSON.stringify(riwayat));
    navigate("/riwayat");
  };

  if (!transaksi) return <p>Tidak ada transaksi.</p>;

  return (
    <div className="pembayaran-container">
      <h2 className="pembayaran-header">Halaman Pembayaran</h2>
      <p className="pembayaran-total">
        Total: <span>Rp {transaksi.total.toLocaleString()}</span>
      </p>

      <h3 className="text-lg font-semibold mb-2">Detail Produk:</h3>
      <ul className="pembayaran-produk-list">
        {transaksi.items.map((item) => (
          <li key={item.id} className="pembayaran-produk-item">
            <div className="pembayaran-produk-info">
              <img
                src={item.image}
                alt={item.title}
                className="pembayaran-produk-img"
              />
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-600">Jumlah: {item.quantity}</p>
              </div>
            </div>
            <p className="text-sm">
              Rp {(item.price * 16000).toLocaleString()} /pcs
            </p>
          </li>
        ))}
      </ul>

      <div className="pembayaran-metode">
        <label className="block mb-2 font-medium">
          Pilih Metode Pembayaran:
        </label>
        <select
          value={metode}
          onChange={(e) => setMetode(e.target.value)}
          className="pembayaran-select"
        >
          <option value="e-wallet">E-Wallet</option>
          <option value="mobile-banking">Mobile Banking</option>
        </select>
      </div>

      <button className="pembayaran-button" onClick={handleBayar}>
        Bayar
      </button>
    </div>
  );
}

export default Pembayaran;
