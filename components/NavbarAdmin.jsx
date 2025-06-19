"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavbarAdmin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <header className="bg-[#234974] text-white px-6 py-4 flex justify-between items-center shadow">
      <h1 className="font-bold text-lg">Admin Panel</h1>
      <button
        onClick={handleLogout}
        disabled={loading}
        className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded text-sm"
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
    </header>
  );
}
