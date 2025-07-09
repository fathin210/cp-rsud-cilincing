"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@mui/material";

export default function AdminPelayananPage() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await fetch("/api/pelayanan");
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus artikel ini?")) return;
    await fetch(`/api/pelayanan/${id}`, { method: "DELETE" });
    fetchData();
  };

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Pelayanan</h1>
        <Link href="/admin/pelayanan/tambah">
          <Button variant="contained" color="primary">Tambah Artikel</Button>
        </Link>
      </div>

      <div className="bg-white shadow-sm rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-[#234974] text-white">
            <tr>
              <th className="p-3 text-left">Judul</th>
              <th className="p-3 text-left">Slug</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">{item.title}</td>
                <td className="p-3">{item.slug}</td>
                <td className="p-3 text-center space-x-2">
                  <Link href={`/admin/pelayanan/edit/${item.id}`}>
                    <Button size="small" variant="outlined">Edit</Button>
                  </Link>
                  <Button size="small" color="error" onClick={() => handleDelete(item.id)}>
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
