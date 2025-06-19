
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function generateStaticParams() {
  const allBerita = await prisma.berita.findMany({
    select: { id: true },
  });

  return allBerita.map((item) => ({ id: item.id.toString() }));
}


export default async function DetailBeritaPage({ params }) {
  const { id } = await params;

  const berita = await prisma.berita.findUnique({
    where: { id: parseInt(id) },
  });

  if (!berita) {
    return <div className="p-6 text-center text-red-600">Berita tidak ditemukan.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-blue-900 mb-4">{berita.judul}</h1>
      <p className="text-sm text-gray-500 mb-6">
        Dipublikasikan oleh <strong>{berita.penulis || "Admin"}</strong> pada{" "}
        {new Date(berita.tanggalPublish).toLocaleDateString("id-ID")}
      </p>

      {berita.gambar && (
        <img
          src={berita.gambar}
          alt={berita.judul}
          className="w-full max-h-[600px] object-contain rounded mb-6"
        />
      )}

      <div className="prose max-w-none prose-blue prose-sm sm:prose-base prose-h2:text-blue-900">
        <div dangerouslySetInnerHTML={{ __html: berita.isi.replace(/\n/g, "<br/>") }} />
      </div>
    </div>
  );
}
