import React from "react";
import Link from "next/link";

const surveyCards = [
  {
    title: "KELUHAN & SARAN",
    href: "http://ekomplain.rsudcilincing.id/",
    bgColor: "bg-[#fff5db]",
    textColor: "text-[#ed8423]",
    delay: 0,
  },
  {
    title: "WHISTLE BLOWING SYSTEM",
    href: "http://wbs.rsudcilincing.id",
    bgColor: "bg-[#e1f0fb]",
    textColor: "text-[#234974]",
    delay: 100,
  },
  {
    title: "UNIT PENGENDALIAN GRATIFIKASI",
    href: "http://wbs.rsudcilincing.id/app/gratifikasi",
    bgColor: "bg-[#ffeaea]",
    textColor: "text-[#d32f2f]",
    delay: 200,
  },
];

export const metadata = {
  title: "RSUD Cilincing - Beranda",
  description: "RSUD Cilincing Siap Melayani Dengan Hati",
  keywords: "RSUD Cilincing, Pengaduan, Whistle Blowing System, Gratifikasi",
  icons: {
    icon: "/favicon.png",
  },
};


export default function Survey() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#234974]">
          Sistem Informasi Pengaduan
        </h2>
        <p className="text-gray-600 mt-2">
          RSUD Cilincing - Melayani Dengan Hati
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {surveyCards.map((card, index) => (
          <Link
            href={card.href}
            key={index}
            data-aos="zoom-in"
            data-aos-delay={card.delay}
          >
            <div
              className={`block p-6 rounded-xl shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${card.bgColor} text-center`}
            >
              <h3 className={`text-lg font-bold mb-2 ${card.textColor}`}>
                {card.title}
              </h3>
              <div className="w-12 h-1 bg-current opacity-30 mx-auto mb-4"></div>
              <p className="text-sm text-gray-600">
                Klik untuk memberikan laporan atau saran.
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
