import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export async function generateStaticParams() {
  const posts = await prisma.careerPost.findMany({
    select: { slug: true },
  });

  return posts.map((post) => ({ slug: post.slug }));
}

export default async function CareerDetailPage(props) {
  const { slug } = props.params;

  const post = await prisma.careerPost.findUnique({
    where: { slug },
  });

  if (!post) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-[#234974] mb-4">{post.title}</h1>

      {/* Tampilkan gambar jika ada */}
      {post.gambar && (
        <img
          src={post.gambar}
          alt={post.title}
          className="w-full max-h-[400px] object-cover rounded-lg mb-6"
        />
      )}

      <div
        className="prose prose-sm sm:prose-base"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
