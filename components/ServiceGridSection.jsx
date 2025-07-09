"use client";

import Lottie from "lottie-react";
import Link from "next/link";
import JadwalDokterAnim from "@/public/lotties/doctor-schedule.json";
import InformasiPublikAnim from "@/public/lotties/information.json";
import PelayananPasienAnim from "@/public/lotties/patient-service.json";
import KanalAduanAnim from "@/public/lotties/feedback.json";

const cardData = [
  {
    title: "Jadwal Dokter",
    description: "Lihat jadwal praktik dokter terbaru",
    href: "/jadwal-dokter",
    bgColor: "bg-[#e0f7f4]",
    hoverBg: "hover:bg-[#4aac90]",
    textColor: "text-[#234974]",
    animation: JadwalDokterAnim,
  },
  {
    title: "Informasi Publik",
    description: "Akses data & informasi layanan rumah sakit",
    href: "http://ppid.rsudcilincing.id/",
    bgColor: "bg-[#e1f0fb]",
    hoverBg: "hover:bg-[#3cb0ce]",
    textColor: "text-[#234974]",
    animation: InformasiPublikAnim,
  },
  {
    title: "Pelayanan Pasien",
    description: "Panduan pelayanan rawat jalan dan inap",
    href: "/pelayanan-pasien",
    bgColor: "bg-[#fff5db]",
    hoverBg: "hover:bg-[#fbc02d]",
    textColor: "text-[#234974]",
    animation: PelayananPasienAnim,
  },
  {
    title: "Kanal Aduan",
    description: "Sampaikan keluhan atau masukan Anda",
    href: "/kanal-aduan",
    bgColor: "bg-[#ffede2]",
    hoverBg: "hover:bg-[#ff9800]",
    textColor: "text-[#234974]",
    animation: KanalAduanAnim,
  },
];

export default function ServiceGridSection() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto my-16 px-6">
      {cardData.map((card, index) => (
        <Link href={card.href} key={index} passHref>
          <div data-aos="fade" data-aos-delay={index * 200} className="w-full h-full">
            <div
              className={`group ${card.bgColor} ${card.hoverBg} h-full transition-all duration-500 p-6 rounded-2xl shadow-lg transform hover:scale-110 hover:shadow-xl cursor-pointer flex flex-col items-center text-center ring-0 hover:ring-1 hover:ring-white`}
            >
              <div className="w-48 h-48 mb-4 transition-all duration-300 group-hover:brightness-110">
                <Lottie animationData={card.animation} loop autoPlay />
              </div>
              <h3
                className={`text-xl font-semibold ${card.textColor} group-hover:text-white transition-colors duration-300`}
              >
                {card.title}
              </h3>
              <p className="text-sm text-gray-600 group-hover:text-white mt-1 transition-colors duration-300 text-center">
                {card.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
