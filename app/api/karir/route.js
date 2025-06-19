// app/api/karir/route.js
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const posts = await prisma.careerPost.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(posts);
}

export async function POST(req) {
  const form = await req.formData();
  const title = form.get("title");
  const slug = form.get("slug");
  const content = form.get("content");
  const file = form.get("gambar");

  let gambarPath = null;

  if (file && typeof file !== "string") {
    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name);
    const folder = path.join(process.cwd(), "public", "karir");

    await mkdir(folder, { recursive: true });

    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
    const filepath = path.join(folder, filename);

    await writeFile(filepath, buffer);
    gambarPath = `/karir/${filename}`;
  }

  const post = await prisma.careerPost.create({
    data: {
      title,
      slug,
      content,
      gambar: gambarPath,
    },
  });

  return NextResponse.json(post);
}
