import { useEffect, useState } from "react";
import "./Profil.css";

function Profil() {
  const [nama, setNama] = useState("");
  const [nomor, setNomor] = useState("");
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState("");
  const [previewFoto, setPreviewFoto] = useState("");

  // Fungsi untuk mengambil data dari backend
  const fetchUserProfile = async () => {
    try {
      const response = await fetch("http://127.0.0.1:6543/user_profiles");
      if (response.ok) {
        const data = await response.json();
        // Jika data ada, kita update state
        if (data && data.length > 0) {
          const userData = data[0]; // Mengambil data pertama, misalnya hanya satu profil
          setNama(userData.nama);
          setNomor(userData.nomor);
          setEmail(userData.email);
          setFoto(userData.foto);
          setPreviewFoto(userData.foto);
        }
      } else {
        console.error("Gagal mengambil data profil");
      }
    } catch (error) {
      console.error("Terjadi kesalahan: ", error);
    }
  };

  useEffect(() => {
    fetchUserProfile(); // Memanggil fetch saat komponen pertama kali dimuat
  }, []); // Empty dependency array, berarti hanya dijalankan sekali saat komponen dimuat

  const handleSimpan = async () => {
    const data = { nama, nomor, email, foto };
    try {
      const response = await fetch("http://127.0.0.1:6543/user_profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("Profil berhasil disimpan!");
      } else {
        alert("Gagal menyimpan profil.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menyimpan profil: ", error);
    }
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoto(reader.result);
        setPreviewFoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profil-container">
      <h2>Profil Pengguna</h2>

      <div className="profil-avatar">
        {previewFoto && <img src={previewFoto} alt="Foto Profil" />}
        <input type="file" accept="image/*" onChange={handleFotoChange} />
      </div>

      <div className="profil-form-group">
        <label>Nama</label>
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
      </div>

      <div className="profil-form-group">
        <label>Nomor HP</label>
        <input
          type="tel"
          value={nomor}
          onChange={(e) => setNomor(e.target.value)}
        />
      </div>

      <div className="profil-form-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button className="profil-save-btn" onClick={handleSimpan}>
        Simpan Profil
      </button>
    </div>
  );
}

export default Profil;
