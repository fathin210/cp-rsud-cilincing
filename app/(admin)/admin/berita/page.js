"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  Button,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export default function AdminBerita() {
  const [berita, setBerita] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/berita")
      .then((res) => res.json())
      .then((data) => setBerita(data.items || []));
  }, []);

  const hapus = async (id) => {
    if (confirm("Hapus berita ini?")) {
      await fetch(`/api/berita/${id}`, { method: "DELETE" });
      setBerita((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#234974]">Kelola Berita</h1>
        <Button
          variant="contained"
          className="bg-[#234974] hover:bg-[#1a365a]"
          onClick={() => router.push("/admin/berita/tambah")}
        >
          + Tambah Berita
        </Button>
      </div>

      {berita.length === 0 ? (
        <p className="text-gray-500">Belum ada berita.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {berita.map((item) => (
            <Card key={item.id} className="shadow-md border border-gray-200">
              <CardContent className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">{item.judul}</h2>
                <p className="text-sm text-gray-500">
                  {item.penulis} | {new Date(item.tanggalPublish).toLocaleDateString()}
                </p>
                <div className="flex gap-2 mt-2">
                  <IconButton
                    color="primary"
                    onClick={() => router.push(`/admin/berita/${item.id}/edit`)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => hapus(item.id)}>
                    <Delete />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
