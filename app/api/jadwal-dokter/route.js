import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.jadwalDokter.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(data);
}

export async function POST(req) {
  const form = await req.formData();
  const nama_dokter = form.get("nama_dokter");
  const layanan = form.get("layanan");
  const hari = form.get("hari");
  const jam_dokter = form.get("jam_dokter");
  const file = form.get("foto_dokter");

  let foto_dokter = "";

  if (file && typeof file !== "string") {
    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name);
    const folder = path.join(process.cwd(), "public", "jadwal-dokter");

    await mkdir(folder, { recursive: true });

    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
    const filepath = path.join(folder, filename);

    await writeFile(filepath, buffer);
    foto_dokter = `/jadwal-dokter/${filename}`;
  }

  const data = await prisma.jadwalDokter.create({
    data: {
      nama_dokter: nama_dokter || "",
      layanan: layanan || "",
      hari: hari || "",
      jam_dokter: jam_dokter || "",
      foto_dokter,
    },
  });

  return NextResponse.json(data);
}
