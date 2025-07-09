import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const jobs = [
  {
    title: "Tenaga Cleaning Service (PJLP)",
    location: "RSUD Cilincing, Jakarta Utara",
    type: "PJLP (Kontrak)",
    description:
      "Bertanggung jawab menjaga kebersihan lingkungan rumah sakit. Diutamakan jujur dan disiplin.",
    deadline: "15 Juli 2025",
  },
  {
    title: "Perawat Pelaksana",
    location: "Instalasi Rawat Inap",
    type: "Kontrak",
    description:
      "STR aktif & pengalaman minimal 1 tahun di fasilitas kesehatan tingkat pertama atau RS.",
    deadline: "10 Agustus 2025",
  },
];

export default function KarirPage() {
  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      {/* Hero Section */}
      <div className="bg-[#234974] text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Karir di RSUD Cilincing</h1>
        <p className="text-lg max-w-2xl mx-auto text-[#f9e181]">
          Jadilah bagian dari tim kami dalam memberikan pelayanan kesehatan terbaik bagi masyarakat Jakarta Utara.
        </p>
      </div>

      {/* Job Listings */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job, index) => (
          <div key={index} className="bg-white rounded-2xl shadow hover:shadow-lg p-6 flex flex-col justify-between border-t-4 border-[#4aac90]">
            <div>
              <div className="flex items-center text-[#234974] mb-3">
                <FaBriefcase className="mr-2 text-[#ed8423]" />
                <h2 className="text-xl font-semibold">{job.title}</h2>
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <FaMapMarkerAlt className="mr-2 text-[#4aac90]" />
                {job.location}
              </div>
              <p className="text-sm text-gray-600 mb-3">{job.type}</p>
              <p className="text-gray-800 text-sm mb-6">{job.description}</p>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2 text-[#ed8423]" />
                Batas: {job.deadline}
              </div>
              <button className="text-white bg-[#4aac90] hover:bg-[#359d9e] text-sm px-4 py-1 rounded-md transition">
                Lamar Sekarang
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
