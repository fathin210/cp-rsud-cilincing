"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditJadwalDokter() {
  const router = useRouter();
  const params = useParams();
  const [form, setForm] = useState({
    nama_dokter: "",
    layanan: "",
    hari: "",
    jam_dokter: "",
    foto_dokter: null,
  });

  useEffect(() => {
    fetch(`/api/jadwal-dokter/${params.id}`)
      .then((res) => res.json())
      .then((data) =>
        setForm({
          nama_dokter: data.nama_dokter,
          layanan: data.layanan,
          hari: data.hari,
          jam_dokter: data.jam_dokter,
          foto_dokter: null,
        })
      );
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => v && fd.append(k, v));
    const res = await fetch(`/api/jadwal-dokter/${params.id}`, {
      method: "PUT",
      body: fd,
    });
    if (res.ok) router.push("/admin/jadwal-dokter");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Edit Jadwal Dokter</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input type="text" value={form.nama_dokter} onChange={(e) => setForm({ ...form, nama_dokter: e.target.value })} placeholder="Nama Dokter" className="p-2 border rounded" required />
        <input type="text" value={form.layanan} onChange={(e) => setForm({ ...form, layanan: e.target.value })} placeholder="Layanan" className="p-2 border rounded" required />
        <input type="text" value={form.hari} onChange={(e) => setForm({ ...form, hari: e.target.value })} placeholder="Hari" className="p-2 border rounded" required />
        <input type="text" value={form.jam_dokter} onChange={(e) => setForm({ ...form, jam_dokter: e.target.value })} placeholder="Jam Mulai" className="p-2 border rounded w-1/2" required />
        <input type="file" accept="image/*" onChange={(e) => setForm({ ...form, foto_dokter: e.target.files[0] })} className="cursor-pointer" />
        <button type="submit" className="bg-blue-700 text-white py-2 rounded">Update</button>
      </form>
    </div>
  );
}
