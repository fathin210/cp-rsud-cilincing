import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

// GET semua artikel
export async function GET() {
  const data = await prisma.pelayanan.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(data);
}

// POST: Tambah artikel pelayanan
export async function POST(req) {
  const form = await req.formData();
  const title = form.get("title");
  const slug = form.get("slug");
  const content = form.get("content");
  const file = form.get("thumbnail");

  // 1. Simpan artikel tanpa thumbnail dulu
  const newPost = await prisma.pelayanan.create({
    data: {
      title,
      slug,
      content,
      thumbnail: "",
    },
  });

  let thumbnail = "";

  if (file && typeof file !== "string") {
    const buffer = Buffer.from(await file.arrayBuffer());

    const folder = path.join(process.cwd(), "public", "uploads", "pelayanan");
    await mkdir(folder, { recursive: true });

    const filename = `${newPost.id}.jpg`;
    const filepath = path.join(folder, filename);

    await writeFile(filepath, buffer);
    thumbnail = `/uploads/pelayanan/${filename}`;

    // 2. Update entri dengan path thumbnail
    await prisma.pelayanan.update({
      where: { id: newPost.id },
      data: { thumbnail },
    });
  }

  return NextResponse.json({ ...newPost, thumbnail });
}