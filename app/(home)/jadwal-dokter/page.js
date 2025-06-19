"use client";

import React, { useEffect, useState } from "react";
import { TextField, MenuItem } from "@mui/material";
import Image from "next/image";

export default function JadwalDokterPage() {
  const [dokterList, setDokterList] = useState([]);
  const [selectedSpesialis, setSelectedSpesialis] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/jadwal-dokter");
        const data = await res.json();
        setDokterList(data);
      } catch (error) {
        console.error("Gagal mengambil data dokter:", error);
      }
    };
    fetchData();
  }, []);

  const uniqueLayanan = [...new Set(dokterList.map((d) => d.layanan))];

  const filteredDoctors = selectedSpesialis
    ? dokterList.filter((d) => d.layanan === selectedSpesialis)
    : dokterList;

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#234974] mb-6">
        Jadwal Dokter RSUD Cilincing
      </h1>

      {/* Filter */}
      <div className="mb-8 max-w-sm">
        <TextField
          fullWidth
          select
          label="Filter Spesialis"
          value={selectedSpesialis}
          onChange={(e) => setSelectedSpesialis(e.target.value)}
        >
          <MenuItem value="">Semua Spesialis</MenuItem>
          {uniqueLayanan.map((layanan, index) => (
            <MenuItem key={index} value={layanan}>
              {layanan}
            </MenuItem>
          ))}
        </TextField>
      </div>

      {/* Grid Dokter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredDoctors.map((dokter) => (
          <div
            key={dokter.id}
            className="bg-white shadow-md rounded-2xl overflow-hidden transition hover:shadow-lg border border-gray-100"
          >
            <div className="relative h-72 w-full">
              <Image
                src={dokter.foto_dokter || "/foto.jpg"} // fallback ke foto default
                alt={dokter.nama_dokter}
                layout="fill"
                objectFit="contain"
                objectPosition="top"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#234974] mb-1">{dokter.nama_dokter}</h3>
              <p className="text-sm text-gray-600 mb-1">{dokter.layanan}</p>
              <p className="text-sm text-gray-500">{dokter.hari}</p>
              <p className="text-sm text-gray-500">
                {dokter.jam_dokter}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
