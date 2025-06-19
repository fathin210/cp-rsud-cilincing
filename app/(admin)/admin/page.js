"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaUserMd, FaNewspaper, FaBriefcaseMedical } from "react-icons/fa";

export default function AdminHome() {
  const [counts, setCounts] = useState({
    berita: 0,
    karir: 0,
    dokter: 0,
  });

  useEffect(() => {
    async function fetchCounts() {
      const [berita, karir, dokter] = await Promise.all([
        fetch("/api/berita").then((res) => res.json()),
        fetch("/api/karir").then((res) => res.json()),
        fetch("/api/jadwal-dokter").then((res) => res.json()),
      ]);

      setCounts({
        berita: berita.items.length,
        karir: karir.length,
        dokter: dokter.length,
      });
    }

    fetchCounts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        Selamat Datang, Admin
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          title="Berita"
          icon={<FaNewspaper size={28} />}
          count={counts.berita}
          link="/admin/berita"
        />
        <Card
          title="Karir"
          icon={<FaBriefcaseMedical size={28} />}
          count={counts.karir}
          link="/admin/karir"
        />
        <Card
          title="Jadwal Dokter"
          icon={<FaUserMd size={28} />}
          count={counts.dokter}
          link="/admin/jadwal-dokter"
        />
      </div>
    </div>
  );
}

function Card({ title, icon, count, link }) {
  return (
    <Link href={link}>
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition cursor-pointer">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-blue-800">{title}</h2>
          <div className="text-[#4aac90]">{icon}</div>
        </div>
        <p className="text-4xl font-bold text-gray-800">{count}</p>
        <p className="text-sm text-blue-600 mt-2">Lihat Detail →</p>
      </div>
    </Link>
  );
}
