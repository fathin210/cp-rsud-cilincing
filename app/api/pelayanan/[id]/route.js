import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

// GET: Ambil 1 artikel berdasarkan ID
export async function GET(_, { params }) {
  const post = await prisma.pelayanan.findUnique({
    where: { id: Number(params.id) },
  });

  return NextResponse.json(post);
}

// PUT: Update artikel & thumbnail
export async function PUT(req, { params }) {
  const id = Number(params.id);
  const form = await req.formData();

  const title = form.get("title");
  const slug = form.get("slug");
  const content = form.get("content");
  const file = form.get("thumbnail");

  let thumbnail = form.get("currentThumbnail") || "";

  if (file && typeof file !== "string") {
    const buffer = Buffer.from(await file.arrayBuffer());
    const folder = path.join(process.cwd(), "public", "uploads", "pelayanan");

    await mkdir(folder, { recursive: true });

    const filename = `${id}.jpg`;
    const filepath = path.join(folder, filename);

    await writeFile(filepath, buffer);
    thumbnail = `/uploads/pelayanan/${filename}`;
  }

  const updated = await prisma.pelayanan.update({
    where: { id },
    data: { title, slug, content, thumbnail },
  });

  return NextResponse.json(updated);
}

// DELETE: Hapus artikel
export async function DELETE(_, { params }) {
  await prisma.pelayanan.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ message: "Artikel berhasil dihapus" });
}
