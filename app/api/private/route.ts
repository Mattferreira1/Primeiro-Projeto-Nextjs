import { NextResponse } from "next/server";
import { cookies as Cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET() {
  const cookies = await Cookies();
  const token = cookies.get("token")?.value;

  if (!token)
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user)
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );

    return NextResponse.json({
      message: "Autorizado",
      user: { id: user.id, email: user.email },
    });
  } catch {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}
