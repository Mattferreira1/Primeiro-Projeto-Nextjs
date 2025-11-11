import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  // DTO login.dto.ts
  // TODO: Melhorar validação dos dados
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user)
    return NextResponse.json(
      { error: "Usuário não encontrado" },
      { status: 401 }
    );

  const valid = await bcrypt.compare(password, user.password);
  if (!valid)
    return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });

  return NextResponse.json({
    message: "Login bem-sucedido",
    user: { id: user.id, email: user.email },
  });
}
