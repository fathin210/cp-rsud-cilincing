"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaUserMd } from "react-icons/fa";

export default function JadwalDokterList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const res = await fetch("/api/jadwal-dokter");
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Yakin ingin menghapus jadwal dokter ini?");
    if (!confirmDelete) return;

    setLoading(true);
    const res = await fetch(`/api/jadwal-dokter/${id}`, { method: "DELETE" });

    if (res.ok) {
      setData((prev) => prev.filter((d) => d.id !== id));
    } else {
      alert("Gagal menghapus data.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900 flex items-center gap-2">
          <FaUserMd className="text-blue-700" /> Jadwal Dokter
        </h1>
        <Link
          href="/admin/jadwal-dokter/tambah"
          className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded shadow"
        >
          + Tambah Dokter
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((dokter) => (
          <div
            key={dokter.id}
            className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition p-4 flex flex-col"
          >
            {dokter.foto_dokter && (
              <img
                src={dokter.foto_dokter}
                alt={dokter.nama_dokter}
                className="w-full h-48 object-contain rounded-lg mb-4"
              />
            )}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-800 mb-1">{dokter.nama_dokter}</h3>
              <p className="text-sm text-gray-600 mb-1">{dokter.layanan}</p>
              <p className="text-sm text-gray-600 mb-1">{dokter.hari}</p>
              <p className="text-sm text-gray-600">{dokter.jam_dokter}</p>
            </div>
            <div className="mt-4 flex justify-between">
              <Link
                href={`/admin/jadwal-dokter/edit/${dokter.id}`}
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                <MdEdit className="text-lg" />
                Edit
              </Link>
              <button
                onClick={() => handleDelete(dokter.id)}
                disabled={loading}
                className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 text-sm font-medium"
              >
                <MdDelete className="text-lg" />
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
