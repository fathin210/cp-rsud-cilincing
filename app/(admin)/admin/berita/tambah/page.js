"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TambahBerita() {
  const router = useRouter();
  const [form, setForm] = useState({
    judul: "",
    slug: "",
    isi: "",
    penulis: "",
    tanggalPublish: "",
  });

  const [gambar, setGambar] = useState(null);
  const [gambarPreview, setGambarPreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setGambar(file);
      setGambarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("tanggalPublish", new Date(form.tanggalPublish).toISOString());
    if (gambar) {
      formData.append("gambar", gambar);
    }

    const res = await fetch("/api/berita", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      router.push("/admin/berita");
    } else {
      alert("Gagal menyimpan berita");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-[#234974]">Tambah Berita</h2>

        <input
          type="text"
          name="judul"
          placeholder="Judul"
          required
          value={form.judul}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="slug"
          placeholder="Slug"
          required
          value={form.slug}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <textarea
          name="isi"
          rows="5"
          placeholder="Isi Berita"
          required
          value={form.isi}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="penulis"
          placeholder="Penulis"
          value={form.penulis}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="date"
          name="tanggalPublish"
          value={form.tanggalPublish}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <div>
          {gambarPreview && (
            <img
              src={gambarPreview}
              alt="Preview"
              className="w-32 h-32 object-cover mb-2 rounded"
            />
          )}
          <input
            type="file"
            name="gambar"
            accept="image/*"
            onChange={handleFileChange}
            className="p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-[#234974] text-white px-4 py-2 rounded hover:bg-[#1a365a]"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
