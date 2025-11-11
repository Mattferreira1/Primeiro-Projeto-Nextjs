import { NextResponse } from "next/server";

export async function GET() {
  const users = [
    { id: 1, name: "Cara" },
    { id: 2, name: "João" },
  ];
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const data = await req.json();
  return NextResponse.json({ message: "Usuário criado!", data });
}
