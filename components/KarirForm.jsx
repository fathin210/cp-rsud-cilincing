"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function KarirForm({ post }) {
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [content, setContent] = useState(post?.content || "");
  const [gambar, setGambar] = useState(null);
  const [preview, setPreview] = useState(post?.gambar || null);

  const router = useRouter();

  useEffect(() => {
    if (!gambar) return;

    const objectUrl = URL.createObjectURL(gambar);
    setPreview(objectUrl);

    // Bersihkan object URL saat komponen dibongkar atau file diganti
    return () => URL.revokeObjectURL(objectUrl);
  }, [gambar]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("content", content);
    if (gambar) {
      formData.append("gambar", gambar);
    }

    const res = await fetch(post ? `/api/karir/${post.id}` : "/api/karir", {
      method: post ? "PUT" : "POST",
      body: formData,
    });

    if (res.ok) {
      router.push("/admin/karir");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto p-6">
      <div>
        <label className="block mb-1 font-medium">Judul</label>
        <input
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Slug</label>
        <input
          className="w-full border p-2 rounded"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Konten</label>
        <textarea
          className="w-full border p-2 rounded min-h-[120px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Upload Gambar</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setGambar(e.target.files[0])}
          className="block w-full text-sm text-gray-600"
        />
        {preview && (
          <div className="mt-4">
            <p className="text-sm text-gray-700 mb-2">Preview Gambar:</p>
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 rounded border"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="bg-[#234974] text-white px-4 py-2 rounded hover:bg-[#1e3e64]"
      >
        Simpan
      </button>
    </form>
  );
}
