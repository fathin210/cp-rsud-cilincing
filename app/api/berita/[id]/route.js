import { NextResponse } from "next/server";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(_, context) {
  const { params } = await context;
  const berita = await prisma.berita.findUnique({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json(berita);
}

export async function PUT(req, { params }) {
  const { params } = await context;
  const form = await req.formData();
  const id = parseInt(params.id);
  const judul = form.get("judul");
  const slug = form.get("slug");
  const isi = form.get("isi");
  const penulis = form.get("penulis");
  const tanggalPublish = form.get("tanggalPublish");
  const gambar = form.get("gambar");

  const beritaLama = await prisma.berita.findUnique({ where: { id } });

  let relativePath = beritaLama.gambar;

  if (gambar && typeof gambar !== "string") {
    // Hapus gambar lama (jika ada)
    if (beritaLama?.gambar) {
      const oldPath = path.join(process.cwd(), "public", beritaLama.gambar);
      try {
        await unlink(oldPath);
      } catch (err) {
        console.error("❌ Gagal hapus gambar lama:", err.message);
      }
    }

    const buffer = Buffer.from(await gambar.arrayBuffer());
    const ext = path.extname(gambar.name);
    const filename = `${id}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    relativePath = `/uploads/${filename}`;
  }

  const updated = await prisma.berita.update({
    where: { id },
    data: {
      judul,
      slug,
      isi,
      penulis,
      tanggalPublish: new Date(tanggalPublish),
      gambar: relativePath,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_, { params }) {
  const id = parseInt(params.id);

  const existing = await prisma.berita.findUnique({ where: { id } });
  if (existing?.gambar) {
    const filePath = path.join(process.cwd(), "public", existing.gambar);
    try {
      await unlink(filePath);
    } catch (err) {
      console.warn("Gagal menghapus gambar saat delete:", err.message);
    }
  }

  await prisma.berita.delete({ where: { id } });
  return NextResponse.json({ message: "Berita dihapus" });
}