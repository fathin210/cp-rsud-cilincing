"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePelayanan() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
  });
  const [file, setFile] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", form.title);
    data.append("slug", form.slug);
    data.append("content", form.content);
    if (file) data.append("thumbnail", file);

    await fetch("/api/pelayanan", {
      method: "POST",
      body: data,
    });

    router.push("/admin/pelayanan");
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Tambah Artikel Pelayanan</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Judul"
          className="w-full border px-3 py-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="slug"
          placeholder="Slug (tanpa spasi)"
          className="w-full border px-3 py-2 rounded"
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Isi artikel (HTML)"
          className="w-full border px-3 py-2 rounded h-40"
          onChange={handleChange}
        ></textarea>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Simpan
        </button>
      </form>
    </main>
  );
}
