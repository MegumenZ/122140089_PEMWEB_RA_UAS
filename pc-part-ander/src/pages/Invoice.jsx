import { useLocation } from "react-router-dom";

function Invoice() {
  const location = useLocation();
  const transaksi = location.state?.transaksi;

  if (!transaksi) return <p>Data invoice tidak ditemukan.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Invoice #{transaksi.id}</h2>
      <p>
        <strong>Tanggal:</strong> {transaksi.tanggal}
      </p>
      <p>
        <strong>Metode Pembayaran:</strong> {transaksi.metode}
      </p>
      <h3 className="mt-4 font-semibold">Detail Produk:</h3>
      <ul className="list-disc list-inside">
        {transaksi.items.map((item) => (
          <li key={item.id}>
            {item.title} - {item.quantity}x = Rp{" "}
            {(item.price * item.quantity * 16000).toLocaleString()}
          </li>
        ))}
      </ul>
      <p className="mt-4 font-bold">
        Total: Rp {transaksi.total.toLocaleString()}
      </p>
    </div>
  );
}

export default Invoice;
