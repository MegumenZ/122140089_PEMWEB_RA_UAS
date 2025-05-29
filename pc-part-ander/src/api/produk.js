const BASE_URL = "http://localhost:6543/api/mahasiswa";

export async function getMahasiswa() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch mahasiswa");
  return res.json();
}

export async function addMahasiswa(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add mahasiswa");
  return res.json();
}

export async function updateMahasiswa(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update mahasiswa");
  return res.json();
}

export async function deleteMahasiswa(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete mahasiswa");
  return res.json();
}
