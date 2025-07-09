import Link from "next/link";
import { FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo dan Deskripsi */}
        <div>
          <h2 className="text-xl font-bold mb-2">RSUD Cilincing</h2>
          <p className="text-sm text-gray-300">
            RSUD Cilincing berdiri pada tanggal 15 April 2015, dengan type Rumah
            Sakit kelas C.
            <br />
            <strong>Visi:</strong>
            <br />
            Menjadi Rumah Sakit Terbaik, Terpercaya dan Berdaya Saing Global
            <br />
            <strong>Misi:</strong>
            <br />
            1. Menyelenggarakan pelayanan kesehatan paripurna dan profesional
            yang berfokus pada pasien
            <br />
            2. Meningkatkan mutu layanan dan keselamatan pasien sehingga
            tercipta layanan terbaik dan kepuasan pelanggan
            <br />
            3. Menerapkan pelayanan terintegrasi berbasis teknologi informasi
            <br />
            4. Menyelenggarakan tata kelola manajemen rumah sakit secara
            efisien, transparan dan akuntabel
            <br />
            5. Meningkatkan sarana dan prasarana untuk pelayanan yang
            berkualitas
            <br />
            6. Membangun dan membina hubungan baik dengan stakeholder
          </p>
        </div>

        {/* Kontak */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Kontak Kami</h3>
          <p className="text-sm text-gray-300">
            Jl. Madya Kebantenan No. 4 Kel. Semper Timur Kec. Cilincing Jakarta
            Utara
            <br />
            Telp: (021) 4412 889
            <br />
            Email: rsud.cilincing@jakarta.go.id
          </p>
        </div>

        {/* Sosial Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Media Sosial</h3>
          <div className="flex items-center gap-4 text-2xl">
            <Link
              href="https://www.instagram.com/rsudcilincingjakarta/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E1306C] transition-colors"
            >
              <FaInstagram />
            </Link>
            <Link
              href="https://www.youtube.com/@rsudcilincing2813"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF0000] transition-colors"
            >
              <FaYoutube />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-blue-700 mt-10 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} RSUD Cilincing. All rights reserved.
      </div>
    </footer>
  );
}
