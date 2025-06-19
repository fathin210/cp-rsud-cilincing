import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");

  if (pageParam && limitParam) {
    const page = parseInt(pageParam);
    const limit = parseInt(limitParam);
    const offset = (page - 1) * limit;

    const [items, total] = await Promise.all([
      prisma.berita.findMany({
        skip: offset,
        take: limit,
        orderBy: { tanggalPublish: "desc" },
      }),
      prisma.berita.count(),
    ]);

    return NextResponse.json({ items, total });
  } else {
    // Tanpa paginasi: kembalikan semua data
    const items = await prisma.berita.findMany({
      orderBy: { tanggalPublish: "desc" },
    });
    const total = items.length;

    return NextResponse.json({ items, total });
  }
}

export async function POST(req) {
  const form = await req.formData();
  const judul = form.get("judul");
  const slug = form.get("slug");
  const isi = form.get("isi");
  const penulis = form.get("penulis");
  const tanggalPublish = form.get("tanggalPublish");
  const gambar = form.get("gambar");

  // Simpan dulu tanpa gambar
  const berita = await prisma.berita.create({
    data: {
      judul,
      slug,
      isi,
      penulis,
      tanggalPublish: new Date(tanggalPublish),
      gambar: "", // atau null
    },
  });

  if (gambar && typeof gambar !== "string") {
    const buffer = Buffer.from(await gambar.arrayBuffer());
    const ext = path.extname(gambar.name); // .png, .jpg, dll
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const filename = `${berita.id}${ext}`;
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    const relativePath = `/uploads/${filename}`;
    await prisma.berita.update({
      where: { id: berita.id },
      data: { gambar: relativePath },
    });

    berita.gambar = relativePath; // update lokal untuk response
  }

  return NextResponse.json(berita);
}