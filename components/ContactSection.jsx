"use client";
import React from "react";
import { MdLocationOn, MdPhone, MdEmail, MdAccessTime } from "react-icons/md";

const infoList = [
  {
    icon: <MdLocationOn className="text-3xl text-[#234974]" />, // Biru tua
    title: "Alamat",
    description: (
      <>
        Jl. Madya Kebantenan No. 4 Kel. Semper Timur Kec. Cilincing <br />
        Jakarta Utara, 14130
      </>
    ),
    border: "#234974",
    textColor: "#234974",
  },
  {
    icon: <MdPhone className="text-3xl text-[#4aac90]" />, // Hijau toska
    title: "Hubungi Kami",
    description: "(021) 44835678",
    border: "#4aac90",
    textColor: "#4aac90",
  },
  {
    icon: <MdEmail className="text-3xl text-[#ed8423]" />, // Oranye cerah
    title: "Email Kami",
    description: "rsudcilincing@jakarta.go.id",
    border: "#ed8423",
    textColor: "#ed8423",
  },
  {
    icon: <MdAccessTime className="text-3xl text-[#f9e181]" />, // Kuning lembut
    title: "Waktu Pelayanan",
    description: (
      <>
        Senin – Kamis: 08:00 – 16:00 <br />
        Jumat: 08:00 – 16:30
      </>
    ),
    border: "#f9e181",
    textColor: "#c09c15", // Sedikit lebih gelap agar readable
  },
];

export default function ContactSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#1A237E] mb-12">
          Kontak Kami
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Cards */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
              {infoList.map((item, index) => (
                <InfoCard
                  key={index}
                  index={index}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  border={item.border}
                  textColor={item.textColor}
                />
              ))}
            </div>
          </div>

          {/* Right Map */}
          <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-md" data-aos="fade">
            <iframe
              title="Lokasi RSUD Cilincing"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.1313041995786!2d106.92373117498943!3d-6.1130192938735535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a2017c8743295%3A0xa5b9243383dc3aad!2sRSUD%20Cilincing!5e0!3m2!1sid!2sid!4v1749883074871!5m2!1sid!2sid"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

const InfoCard = ({ index, icon, title, description, border, textColor }) => {
  return (
    <div
      className={`p-6 rounded-3xl inset-shadow-xs shadow-xl bg-white flex flex-col gap-2 border-b-4`}
      style={{ borderBottomColor: border }}
      data-aos="fade"
      data-aos-delay={index * 100}
    >
      <div className="text-3xl">{icon}</div>
      <h3 className="text-xl font-semibold" style={{ color: textColor }}>
        {title}
      </h3>
      <p>{description}</p>
    </div>
  );
};
