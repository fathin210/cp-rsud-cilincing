"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

export default function BeritaSection() {
  const [berita, setBerita] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 4;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/berita?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setBerita(data.items);
        setTotalPages(Math.ceil(data.total / limit));
        setLoading(false);
      });
  }, [page]);

  return (
    <section className="bg-[#f3f6fb] py-16 px-6">
      <div className="max-w-7xl mx-auto relative">
        {/* Heading */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-bold">
            <span className="text-blue-900">Berita </span>
            <span className="text-[#4aac90]">Terkini</span>
          </h2>

          {/* Navigasi Panah */}
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="bg-white text-blue-800 rounded-full p-2 shadow disabled:opacity-30"
              style={{
                cursor: page === 1 ? "not-allowed" : "pointer",
              }}
            >
              <MdArrowBackIos size={20} />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={{
                cursor: page === totalPages ? "not-allowed" : "pointer",
              }}
              className="bg-white text-blue-800 rounded-full p-2 shadow disabled:opacity-30"
            >
              <MdArrowForwardIos size={20} />
            </button>
          </div>
        </div>

        {/* Grid Berita */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {berita.map((item, index) => (
            <Link
              href={`/berita/${item.id}`}
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="h-full"
            >
              <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition h-full cursor-pointer">
                {item.gambar && (
                  <img
                    src={item.gambar}
                    alt={item.judul}
                    className="w-full h-72 object-contain rounded-lg mb-4"
                  />
                )}
                <p className="text-sm text-gray-400 mb-2">
                  {new Date(item.tanggalPublish).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h3 className="font-semibold text-lg text-blue-800">
                  {item.judul}
                </h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {item.isi?.slice(0, 120)}...
                </p>
                <p className="text-sm text-blue-600 mt-3">
                  Baca Selengkapnya →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
