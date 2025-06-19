"use client";

import { useState, useEffect } from "react";

export default function AdminJadwalDokter() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    nama_dokter: "",
    layanan: "",
    hari: "",
    jam_dokter: "",
    foto_dokter: null,
  });

  useEffect(() => {
    fetch("/api/jadwal-dokter")
      .then(res => res.json())
      .then(setData);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => fd.append(key, value));

    const res = await fetch("/api/jadwal-dokter", {
      method: "POST",
      body: fd,
    });

    const newItem = await res.json();
    setData([newItem, ...data]);

    setForm({ nama_dokter: "", layanan: "", hari: "", jam_dokter: "", foto_dokter: null });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl font-bold text-center my-6">Tambah Jadwal Dokter</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-8">
        <input
          type="text"
          placeholder="Nama Dokter"
          className="p-2 border rounded"
          value={form.nama_dokter}
          onChange={(e) => setForm({ ...form, nama_dokter: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Layanan"
          className="p-2 border rounded"
          value={form.layanan}
          onChange={(e) => setForm({ ...form, layanan: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Hari Praktik"
          className="p-2 border rounded"
          value={form.hari}
          onChange={(e) => setForm({ ...form, hari: e.target.value })}
          required
        />
        <div className="flex flex-col">
          <label htmlFor="jam_dokter">Jam Mulai</label>
          <input
            id="jam_dokter"
            type="time"
            className="p-2 border rounded"
            value={form.jam_dokter}
            onChange={(e) => setForm({ ...form, jam_dokter: e.target.value })}
            required
          />
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, foto_dokter: e.target.files[0] })}
        />
        <button
          type="submit"
          className="bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
        >
          Simpan Jadwal
        </button>
      </form>
    </div>
  );
}
