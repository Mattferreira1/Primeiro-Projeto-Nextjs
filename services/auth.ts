import { User } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { cookies as Cookies } from "next/headers";

export async function loginEmployer(
  email: string,
  password: string,
  companyId: string
) {
  const cookies = await Cookies();

  // TODO: Validar email e se está nessa empresa

  // const token = await createToken({});

  // cookies.set("BearerToken", token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   path: "/",
  // });

  // cookies.set("EmpresasId", user.id, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   path: "/",
  // });
}

async function createToken({
  user,
  companyId,
}: {
  user: User;
  companyId: string;
}) {
  const JWT_SECRET = process.env.JWT_SECRET!;

  const token = sign(
    { id: user.id, email: user.email, companyId: companyId },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return token;
}
