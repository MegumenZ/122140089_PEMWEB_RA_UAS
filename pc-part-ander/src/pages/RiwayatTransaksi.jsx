import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RiwayatTransaksi() {
  const [riwayat, setRiwayat] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("riwayatTransaksi")) || [];
    setRiwayat(data);
  }, []);

  const handleKlikTransaksi = (trx) => {
    navigate(`/invoice/${trx.id}`, { state: { transaksi: trx } });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Riwayat Transaksi</h2>
      {riwayat.length === 0 ? (
        <p>Belum ada transaksi.</p>
      ) : (
        <ul className="space-y-4">
          {riwayat.map((trx) => (
            <li
              key={trx.id}
              className="p-4 border border-gray-300 rounded shadow flex items-center justify-between"
            >
              <div>
                <p className="font-semibold">#{trx.id}</p>
                <p>{trx.tanggal}</p>
                <p>Total: Rp {trx.total.toLocaleString()}</p>
              </div>
              <button
                onClick={() => handleKlikTransaksi(trx)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Lihat Invoice
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RiwayatTransaksi;
