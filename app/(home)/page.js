import Carousel from "@/components/Carousel";
import ContactSection from "@/components/ContactSection";
import ServiceGridSection from "@/components/ServiceGridSection";
import EmergencySection from "@/components/EmergencySection";
import BeritaSection from "@/components/BeritaSection";

export const metadata = {
  title: "RSUD Cilincing - Beranda",
  description: "RSUD Cilincing Siap Melayani Dengan Hati",
  keywords: "RSUD Cilincing, Rumah Sakit, Jakarta Utara, Pelayanan Kesehatan, Dokter, Berita Kesehatan",

  icons: {
    icon: "/favicon.png",
  },
};

export default function Home() {
  return (
    <main className="mt-0">
      <section className="mx-4 mt-2">
        <Carousel />
      </section>

      {/* Tentang Kami */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center space-y-6" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-[#4aac90]">Siap Melayani</span>{" "}
            <span className="text-[#234974]">dengan Hati</span>
          </h2>
          <p className="text-gray-700 text-lg md:text-xl">
            RSUD Cilincing adalah Rumah Sehat Untuk Jakarta yang hadir untuk masyarakat dengan
            pelayanan prima, SDM profesional, dan fasilitas yang terus ditingkatkan demi mendukung
            visi Jakarta Sehat. Kami berkomitmen menjadi mitra kesehatan terbaik Anda di Jakarta Utara.
          </p>
        </div>
      </section>


      {/* Jadwal Dokter & Booking */}
      <ServiceGridSection />

      <EmergencySection />

      {/* Berita RSUD Cilincing */}
      <BeritaSection />
      <ContactSection />
    </main>
  );
}
