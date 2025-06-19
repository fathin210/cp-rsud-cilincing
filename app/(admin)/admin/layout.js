// app/admin/layout.js
import "@/app/global.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Geist, Geist_Mono } from "next/font/google";
import NavbarAdmin from "@/components/NavbarAdmin";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default async function AdminLayout({ children }) {
  const token = (await cookies()).get("admin_token");

  if (!token) {
    redirect("/admin/login"); // Gunakan path login kamu
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NavbarAdmin />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
