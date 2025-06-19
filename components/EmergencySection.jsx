"use client";

import React from "react";
import Image from "next/image";
import {
  LocalHospital,
  Accessible,
  Add,
  Science,
  Hotel,
  PregnantWoman,
  LocalPharmacy,
  MedicalServices,
} from "@mui/icons-material";

const services = [
  {
    icon: LocalHospital,
    title: "IGD",
    desc: "Pelayanan IGD 24 Jam",
    color: "#ed8423", // oranye
  },
  {
    icon: Accessible,
    title: "Poli Sp. Rawat Jalan",
    desc: "Senin - Sabtu",
    color: "#4aac90", // hijau toska
  },
  {
    icon: LocalPharmacy,
    title: "Apotik",
    desc: "Pelayanan 24 Jam",
    color: "#234974", // biru tua
  },
  {
    icon: MedicalServices,
    title: "Fisioterafi",
    desc: "Senin - Sabtu",
    color: "#359d9e", // hijau kebiruan
  },
  {
    icon: Add,
    title: "Radiologi",
    desc: "Senin - Sabtu",
    color: "#f9e181", // kuning lembut
  },
  {
    icon: Science,
    title: "Laboratorium",
    desc: "Senin - Sabtu",
    color: "#4aac90", // hijau toska
  },
  {
    icon: Hotel,
    title: "Rawat Inap",
    desc: "Pelayanan RSUD Cilincing",
    color: "#ed8423", // oranye
  },
  {
    icon: PregnantWoman,
    title: "Rawat Bersalin",
    desc: "Pelayanan RSUD Cilincing",
    color: "#234974", // biru tua
  },
];

const EmergencySection = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        {/* Left: Doctor Image */}
        <div className="w-full md:w-5/12" data-aos="fade">
          <Image
            src="/emergency-service.jpg" // Ganti path jika perlu
            alt="Dokter RSUD Cilincing"
            width={450}
            height={450}
            className="object-contain h-full w-full max-w-[500px] m-auto"
          />
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-7/12 space-y-8">
          {/* Header Box */}
          <div
            className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm"
            data-aos="fade"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Dalam keadaan darurat? Butuh bantuan sekarang?
                </h2>
                <p className="text-sm text-gray-600">
                  Fasilitas dan pelayanan yang tersedia di RSUD Cilincing
                </p>
              </div>
              <a
                href="tel:0214412889"
                className="text-center inline-block bg-[#234974] hover:bg-[#1e3e64] transition text-white font-medium px-6 py-2 rounded-lg text-sm shadow-md cursor-pointer"
              >
                TELP. RSUD CILINCING
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {services.map(({ icon: Icon, title, desc, color }, index) => (
              <div key={index} data-aos="fade" data-aos-delay={index * 50}>
                <div className="flex items-start gap-4 p-4 rounded-xl shadow-lg hover:shadow-xl transition bg-white">
                  <div className="text-[#234974] mt-1">
                    <Icon fontSize="medium" style={{ color }} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">
                      {title}
                    </p>
                    <p className="text-sm text-gray-600">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencySection;
