import { collection, getDocs } from "firebase/firestore";
import { EStatus } from "@/enum/EStatus";
import { prisma } from "@/lib/prisma";

// TODO: adicionar tratamento de ERRO para caso o DB caia ou coleção não exista
// TODO: adicionar tipagem
export async function getEmployers(): Promise<any> {
  try {
    const data = await prisma.user.findMany();

    return {
      message: "",
      status: EStatus.SUCCESS,
      data,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Erro ao buscar funcionários",
      status: EStatus.ERROR,
      data: null,
    };
  }
}
