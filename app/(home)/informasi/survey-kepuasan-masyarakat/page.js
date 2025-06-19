export const metadata = {
  title: "RSUD Cilincing - Beranda",
  description: "RSUD Cilincing - Survey Kepuasan Masyarakat",
  keywords: "RSUD Cilincing, Survey Kepuasan Masyarakat, Informasi RSUD Cilincing, Pelayanan Kesehatan, Survey Kepuasan",
  icons: {
    icon: "/favicon.png",
  },
};

export default function SurveyPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-[#234974] mb-6">
          Survey Kepuasan Masyarakat
        </h1>

        <div className="rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <iframe
            src="http://web.rsudcilincing.id/assets/document/ARTIKEL%20WEB%20HASIL%20SKM%202020.pdf"
            title="Survey Kepuasan Masyarakat"
            width="100%"
            height="800px"
            className="w-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
}