import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Produk from "./pages/Produk";
import Keranjang from "./pages/Keranjang";
import Pembayaran from "./pages/Pembayaran";
import Profil from "./pages/Profil";
import RiwayatTransaksi from "./pages/RiwayatTransaksi";
import Invoice from "./pages/Invoice";

function App() {
  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <h1>Pc Part Ander</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/produk">Produk</Link>
          <Link to="/keranjang">Keranjang</Link>
          <Link to="/pembayaran">Pembayaran</Link>
          <Link to="/profil">Profil</Link>
        </nav>
      </div>

      {/* Content Container */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produk" element={<Produk />} />
          <Route path="/keranjang" element={<Keranjang />} />
          <Route path="/pembayaran" element={<Pembayaran />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/riwayat" element={<RiwayatTransaksi />} />
          <Route path="/invoice/:id" element={<Invoice />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
