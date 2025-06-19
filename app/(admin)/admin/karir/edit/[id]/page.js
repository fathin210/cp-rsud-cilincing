import KarirForm from "@/components/KarirForm";

export default async function EditKarirPage({ params }) {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/karir/${id}`);
  if (!res.ok) {
    return <div className="text-red-500 text-center mt-10">Data tidak ditemukan.</div>;
  }

  const post = await res.json();

  return (
    <div>
      <h1 className="text-xl font-bold text-center mt-6">Edit Postingan Karir</h1>
      <KarirForm post={post} />
    </div>
  );
}
