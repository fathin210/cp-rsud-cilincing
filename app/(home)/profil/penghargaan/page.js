import { FaAward } from "react-icons/fa";

const awards = [
  {
    title: "Penghargaan Rumah Sakit Ramah Anak",
    year: "2024",
    description: "Diberikan oleh Kementerian Pemberdayaan Perempuan dan Perlindungan Anak.",
  },
  {
    title: "RSUD Terbaik Pelayanan Publik",
    year: "2023",
    description: "Penghargaan dari Gubernur DKI Jakarta atas pelayanan kesehatan terbaik di wilayah Jakarta Utara.",
  },
  {
    title: "Inovasi Layanan Digital",
    year: "2022",
    description: "Penghargaan atas pengembangan sistem antrian dan rekam medis digital berbasis web.",
  },
  {
    title: "Rumah Sakit Bebas Korupsi",
    year: "2021",
    description: "Diberikan oleh KPK dan Ombudsman karena tata kelola rumah sakit yang transparan dan akuntabel.",
  },
];

export default function PenghargaanPage() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] pb-20">
      {/* Hero Section */}
      <div className="bg-[#234974] text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Penghargaan</h1>
        <p className="text-lg max-w-2xl mx-auto text-[#f9e181]">
          Berbagai penghargaan yang telah diraih RSUD Cilincing sebagai bukti dedikasi kami dalam memberikan pelayanan terbaik.
        </p>
      </div>

      {/* Award Cards */}
      <div className="max-w-6xl mx-auto px-4 mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {awards.map((award, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-[#4aac90] transition hover:shadow-lg">
            <div className="flex items-center mb-4">
              <FaAward className="text-[#ed8423] w-6 h-6 mr-3" />
              <h2 className="text-lg font-semibold text-[#234974]">{award.title}</h2>
            </div>
            <p className="text-sm text-gray-500 italic mb-2">Tahun {award.year}</p>
            <p className="text-gray-700 text-sm">{award.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
