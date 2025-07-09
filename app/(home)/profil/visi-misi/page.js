import {
  MdHealthAndSafety,
  MdGroups,
  MdIntegrationInstructions,
  MdManageAccounts,
  MdBuild,
  MdHandshake,
} from "react-icons/md";
import Image from "next/image";

const missions = [
  {
    icon: <MdHealthAndSafety className="text-[#4aac90] w-5 h-5" />,
    text: 'Menyelenggarakan pelayanan kesehatan paripurna dan profesional yang berfokus pada pasien',
  },
  {
    icon: <MdGroups className="text-[#4aac90] w-5 h-5" />,
    text: 'Meningkatkan mutu layanan dan keselamatan pasien sehingga tercipta layanan terbaik dan kepuasan pelanggan',
  },
  {
    icon: <MdIntegrationInstructions className="text-[#4aac90] w-5 h-5" />,
    text: 'Menerapkan pelayanan terintegrasi berbasis teknologi informasi',
  },
  {
    icon: <MdManageAccounts className="text-[#4aac90] w-5 h-5" />,
    text: 'Menyelenggarakan tata kelola manajemen rumah sakit secara efisien, transparan dan akuntabel',
  },
  {
    icon: <MdBuild className="text-[#4aac90] w-5 h-5" />,
    text: 'Meningkatkan sarana dan prasarana untuk pelayanan yang berkualitas',
  },
  {
    icon: <MdHandshake className="text-[#4aac90] w-5 h-5" />,
    text: 'Membangun dan membina hubungan baik dengan stakeholder',
  },
];

export default function VisiMisiPage() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] px-4 py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-stretch" data-aos="fade-up">
        {/* Kiri: Visi dan Misi */}
        <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#234974] mb-6 border-b pb-2">
            Visi
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Menjadi Rumah Sakit Terbaik, Terpercaya dan Berdaya Saing Global
          </p>

          <h2 className="text-3xl font-bold text-[#234974] mb-6 border-b pb-2">
            Misi
          </h2>
          <div className="space-y-5">
            {missions.map((mission, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="mt-1">{mission.icon}</div>
                <p className="text-gray-800">{mission.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Kanan: Gambar RSUD */}
        <div className="relative rounded-2xl overflow-hidden shadow-md min-h-[700px]">
          <Image
            src="/rsud-cilincing.webp"
            alt="RSUD Cilincing"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
