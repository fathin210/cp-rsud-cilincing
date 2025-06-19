import { PrismaClient } from "@prisma/client";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET /api/jadwal-dokter/[id]
export async function GET(_, context) {
  const { id } = context.params;

  const dokter = await prisma.jadwalDokter.findUnique({
    where: { id: parseInt(id) },
  });

  if (!dokter) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(dokter);
}

// PUT /api/jadwal-dokter/[id]
export async function PUT(req, context) {
  const { id } = context.params;
  const dokterId = parseInt(id);
  const form = await req.formData();

  const nama_dokter = form.get("nama_dokter");
  const layanan = form.get("layanan");
  const hari = form.get("hari");
  const jam_dokter = form.get("jam_dokter");
  const file = form.get("foto_dokter");

  const updateData = {
    nama_dokter: nama_dokter || "",
    layanan: layanan || "",
    hari: hari || "",
    jam_dokter: jam_dokter || "",
  };

  // Ambil data lama (untuk tahu foto lama)
  const existing = await prisma.jadwalDokter.findUnique({
    where: { id: dokterId },
  });

  if (!existing) {
    return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
  }

  if (file && typeof file !== "string") {
    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name).toLowerCase();
    const folder = path.join(process.cwd(), "public", "jadwal-dokter");

    await mkdir(folder, { recursive: true });

    // Hapus file lama jika ada
    if (existing.foto_dokter) {
      const oldFilePath = path.join(process.cwd(), "public", existing.foto_dokter);
      try {
        await unlink(oldFilePath);
      } catch (e) {
        console.warn("Gagal hapus gambar lama:", e.message);
      }
    }

    const filename = `${dokterId}${ext}`;
    const newFilePath = path.join(folder, filename);

    await writeFile(newFilePath, buffer);

    updateData.foto_dokter = `/jadwal-dokter/${filename}`;
  }

  const updated = await prisma.jadwalDokter.update({
    where: { id: dokterId },
    data: updateData,
  });

  return NextResponse.json(updated);
}

// DELETE /api/jadwal-dokter/[id]
export async function DELETE(_, context) {
  const { id } = await context.params;

  try {
    const existing = await prisma.jadwalDokter.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (existing.foto_dokter) {
      const filePath = path.join(process.cwd(), "public", existing.foto_dokter);
      try {
        await unlink(filePath);
      } catch (e) {
        console.warn("Gagal hapus file gambar:", e.message);
      }
    }

    await prisma.jadwalDokter.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
