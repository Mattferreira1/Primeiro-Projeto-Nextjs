import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function createEmployerUser(
  email: string,
  password: string,
  name: string,
  companyId: string,
  roles: Role[]
) {
  try {
    const company = await prisma.company.findUniqueOrThrow({
      where: { id: companyId },
    });
  } catch (error) {}
}
