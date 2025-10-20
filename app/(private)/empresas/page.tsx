"use client"

import CardEmpresa from "@/components/CardsEmpresa";
import MainContainer from "@/components/MainContainer";
import { Button } from "@/components/ui/button"
import { db } from "@/src/services/db";
import { collection, getDocs } from "firebase/firestore";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

type Empresa={
  id:string,
  nome:string,
  cnpj:string
}

const Home = () => {
  const [empresas, setEmpresas]= useState<Empresa[]>([])

  const listEmpresasTeste:Empresa[] = [
    {
      id:"1",
      nome:"teste",
      cnpj:"999"
    },
    {
      id:"2",
      nome:"teste",
      cnpj:"999"
    },
    {
      id:"3",
      nome:"teste",
      cnpj:"999"
    },
  ]

  // async function getDocsEmpresas(){
  //  const query= collection(db,"users","PAg3XCrGMytMc7ZjoHkG" ,"empresas")
  //  const data = await getDocs(query)
  //  const listaDeEmpresas = data.docs.map((doc)=>({...doc.data(), id:`${doc.id}`})) as Empresa[]
  //  setEmpresas(listaDeEmpresas)
   
  // }
  //
  useEffect(()=>{
    // getDocsEmpresas()
    setEmpresas(listEmpresasTeste)

  },[])
  return (
    <MainContainer>
      <section>
        <h1 className="text-lg mb-2 font-medium text-gray-700"> Suas empresas</h1>

        <section className="mb-2 py-2 flex gap-3 justify-between border-1 rounded-lg p-3">
          <div className=" flex">
            <Button variant="outline" className="text-sm font-normal cursor-pointer shadow-2xl">Filtrar</Button>
          </div>
          <div className=" flex">
            <Button onClick={()=> redirect("/empresas/cadastrar")} variant="outline" className="text-sm font-normal bg-green-200 border-green-300 cursor-pointer  shadow-2xl hover:bg-green-300">Adicionar nova empresa</Button>
          </div>
        </section>

          <section className="min-w-11/12 m-auto shadow-2xs border-1 p-4 rounded-2xl grid grid-cols-1 gap-3">
          {empresas.map((empresa)=>(
            // <div className="w-full h-30 border-1 rounded-2xl p-4 flex transition-all duration-300 ease-in-out hover:bg-gray-100 " key={empresa.id}>
            //   <div className="w-8/12">
            //     <h2 className="text-sm font-medium text-gray-700">{empresa.nome}</h2>
            //   <p>Cnpj: {empresa.cnpj}</p>
            //   <div>
            //     tags:
            //   </div>
            //   </div>
            //   <div className="flex flex-col gap-3">

            //     <Button onClick={()=>redirect(`/empresa/${empresa.id}/excluir`)} className="text-sm font-bold bg-green-500 border-2 border-green-600 cursor-pointer hover:bg-green-600">Editar</Button>

            //     <Button onClick={()=>redirect(`/empresa/${empresa.id}/excluir`)}className="font-bold text-sm bg-red-400 border-2 border-red-500 cursor-pointer hover:bg-red-500">Excluir</Button>

            //   </div>
            // </div>
            <CardEmpresa 
            empresa={empresa}
            />
          ))}

        </section>
       
      </section>
    </MainContainer>
  )
}

export default Home