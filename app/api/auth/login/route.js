import { NextResponse } from "next/server";

const DUMMY_USER = {
  username: "admin",
  password: "@Admin123", // Gunakan bcrypt hash di produksi
};

export async function POST(req) {
  const { username, password } = await req.json();

  if (
    username === DUMMY_USER.username &&
    password === DUMMY_USER.password
  ) {
    const res = NextResponse.json({ message: "Login berhasil" });
    res.cookies.set("admin_token", "token123", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 2, // 2 jam
    });
    return res;
  }

  return NextResponse.json({ message: "Username atau password salah" }, { status: 401 });
}
