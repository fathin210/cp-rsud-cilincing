"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminKarirListPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/karir")
      .then((res) => res.json())
      .then(setPosts)
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Manajemen Postingan Karir</h1>
        <Link
          href="/admin/karir/tambah"
          className="bg-[#4aac90] text-white px-4 py-2 rounded hover:bg-[#3c947b]"
        >
          Tambah Postingan
        </Link>
      </div>

      <table className="w-full text-sm text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Judul</th>
            <th className="p-3 border">Slug</th>
            <th className="p-3 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-t">
              <td className="p-3">{post.title}</td>
              <td className="p-3">{post.slug}</td>
              <td className="p-3 flex gap-2">
                <Link
                  href={`/admin/karir/edit/${post.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  className="text-red-600 hover:underline"
                  onClick={async () => {
                    if (confirm("Yakin ingin menghapus?")) {
                      await fetch(`/api/karir/${post.id}`, {
                        method: "DELETE",
                      });
                      setPosts((prev) =>
                        prev.filter((p) => p.id !== post.id)
                      );
                    }
                  }}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
