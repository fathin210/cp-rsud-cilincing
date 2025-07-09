"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditPelayanan({ params }) {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    thumbnail: "",
  });
  const [file, setFile] = useState(null);
  const router = useRouter();

  // Fetch data berdasarkan ID
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/pelayanan/${params.id}`);
      const data = await res.json();
      setForm({
        title: data.title,
        slug: data.slug,
        content: data.content,
        thumbnail: data.thumbnail,
      });
    };
    fetchData();
  }, [params.id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = new FormData();
    body.append("title", form.title);
    body.append("slug", form.slug);
    body.append("content", form.content);
    body.append("currentThumbnail", form.thumbnail); // existing if not replaced
    if (file) body.append("thumbnail", file);

    await fetch(`/api/pelayanan/${params.id}`, {
      method: "PUT",
      body,
    });

    router.push("/admin/pelayanan");
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Edit Artikel Pelayanan</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Judul"
          className="w-full border px-3 py-2 rounded"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="slug"
          placeholder="Slug (tanpa spasi)"
          className="w-full border px-3 py-2 rounded"
          value={form.slug}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Isi artikel"
          className="w-full border px-3 py-2 rounded h-40"
          value={form.content}
          onChange={handleChange}
        ></textarea>

        {/* Preview thumbnail */}
        {form.thumbnail && (
          <img
            src={form.thumbnail}
            alt="Thumbnail lama"
            className="w-40 rounded border"
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Simpan Perubahan
        </button>
      </form>
    </main>
  );
}
