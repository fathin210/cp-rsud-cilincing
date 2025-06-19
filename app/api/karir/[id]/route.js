import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import path from "path";
import { mkdir, writeFile } from "fs/promises";

const prisma = new PrismaClient();

export async function GET(_, context) {
  const { id } = context.params;

  const post = await prisma.careerPost.findUnique({
    where: { id: parseInt(id) },
  });

  if (!post) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req, context) {
  const { id } = context.params;
  const form = await req.formData();

  const title = form.get("title");
  const slug = form.get("slug");
  const content = form.get("content");
  const file = form.get("gambar");

  let fotoPath = null;

  if (file && typeof file !== "string") {
    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name);
    const folder = path.join(process.cwd(), "public", "karir");
    await mkdir(folder, { recursive: true });

    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
    const filepath = path.join(folder, filename);

    await writeFile(filepath, buffer);
    fotoPath = `/karir/${filename}`;
  }

  try {
    const post = await prisma.careerPost.update({
      where: { id: parseInt(id) },
      data: {
        title,
        slug,
        content,
        ...(fotoPath && { gambar: fotoPath }), // hanya update jika ada gambar baru
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(_, context) {
  const { id } = context.params;

  try {
    await prisma.careerPost.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
