import React from "react";

const videos = [
  {
    title: "Jangan Mudik, Tetap Aman",
    url: "https://www.youtube.com/embed/_W9naFsIMKs",
    description: "Pesan kesehatan selama masa mudik lebaran.",
  },
  {
    title: "6 Langkah Cuci Tangan",
    url: "https://www.youtube.com/embed/ZF6k_kWXwn8",
    description: "Panduan mencuci tangan yang benar dari RSUD Cilincing.",
  },
  {
    title: "The New Normal RSUD Cilincing! Memakai Masker, Menjaga Jarak dan Memakai Masker (3M)",
    url: "https://www.youtube.com/embed/UpZa0z_BuXQ",
    description: "The New Normal RSUD Cilincing! Memakai Masker, Menjaga Jarak dan Memakai Masker (3M)",
  },
];

export default function VideoEdukasi() {
  return (
    <main className="bg-[#f0f0f0] min-h-screen pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Judul Halaman */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#234974]" data-aos="fade-down">
            Halaman Edukasi Video
          </h1>
          <p className="mt-2 text-gray-600 text-lg" data-aos="fade-up">
            Koleksi video edukasi kesehatan dari RSUD Cilincing
          </p>
        </div>

        {/* Daftar Video */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <div className="aspect-video">
                <iframe
                  src={video.url}
                  title={video.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-[#234974] mb-1">
                  {video.title}
                </h2>
                <p className="text-sm text-gray-600 text-ellipsis">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
