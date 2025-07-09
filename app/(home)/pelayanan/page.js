"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function PelayananPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/pelayanan");
      const data = await res.json();
      setPosts(data);
    };
    fetchData();
  }, []);

  // Fungsi untuk memotong isi konten jadi preview singkat
  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#234974] mb-6">
        Jenis Pelayanan RSUD Cilincing
      </h1>

      <p className="text-gray-700 mb-8">
        Berikut adalah berbagai layanan kesehatan yang tersedia di RSUD Cilincing.
        Klik salah satu untuk melihat detailnya.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/informasi/pelayanan/${post.slug}`}>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
              <div className="h-48 w-full bg-gray-100">
                {post.thumbnail && (
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-[#234974] mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600">
                  {stripHtml(post.content).slice(0, 100)}...
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
