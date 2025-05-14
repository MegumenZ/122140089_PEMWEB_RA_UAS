import { useEffect, useState } from "react";
import "./Profil.css";

function Profil() {
  const [nama, setNama] = useState("");
  const [nomor, setNomor] = useState("");
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState("");
  const [previewFoto, setPreviewFoto] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userProfil")) || {};
    setNama(data.nama || "");
    setNomor(data.nomor || "");
    setEmail(data.email || "");
    setFoto(data.foto || "");
    setPreviewFoto(data.foto || "");
  }, []);

  const handleSimpan = () => {
    const data = { nama, nomor, email, foto };
    localStorage.setItem("userProfil", JSON.stringify(data));
    alert("Profil berhasil disimpan!");
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
