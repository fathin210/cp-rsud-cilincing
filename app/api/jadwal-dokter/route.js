import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.dokter.findMany({
    include: {
      jadwal: true,
    },
    orderBy: { id: "asc" }, // optional
  });

  const formatted = data.map((dokter) => {
    const jadwalMap = {
      senin: "",
      selasa: "",
      rabu: "",
      kamis: "",
      jumat: "",
      sabtu: ""
    };

    dokter.jadwal.forEach((j) => {
      const hari = j.hari.toLowerCase();
      jadwalMap[hari] = j.jam;
    });

    return {
      id: dokter.id,
      nama_dokter: dokter.nama,
      layanan: dokter.layanan,
      foto_dokter: dokter.foto,
      jadwal: jadwalMap
    };
  });

  return NextResponse.json(formatted);
}


export async function POST(req) {
  const form = await req.formData();
  const nama_dokter = form.get("nama_dokter");
  const layanan = form.get("layanan");
  const file = form.get("foto_dokter");

  const hari = form.getAll("hari"); // array: ['Senin', 'Rabu']
  const jam = form.getAll("jam_dokter"); // array: ['08.00 - 12.00', '10.00 - 12.00']

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

  const created = await prisma.dokter.create({
    data: {
      nama: nama_dokter || "",
      layanan: layanan || "",
      foto: foto_dokter,
      jadwal: {
        create: hari.map((h, i) => ({
          hari: h,
          jam: jam[i]
        })),
      },
    },
    include: { jadwal: true },
  });

  return NextResponse.json(created);
}