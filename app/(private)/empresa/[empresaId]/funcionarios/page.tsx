"use client"
import FuncionariosList from '@/components/FuncionariosList'
import { db } from '@/src/services/db'
import { Funcionarios } from '@/src/types/types'
import { collection, getDocs } from 'firebase/firestore'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Props = {

}

const Funcionarios = (props: Props) => {
const [ListaFuncionarios, setListaFuncionarios]= useState<Funcionarios[] | null>()
  const {empresaId} = useParams()

  async function initial(){
    const coll = collection(db, "empresas", `${empresaId}`,"Funcionarios")
    const snapshot = await getDocs(coll)
    const lista = snapshot.docs.map((doc)=>({...doc.data(),id:doc.id})) as Funcionarios[]

    setListaFuncionarios(lista)
  }
  
  useEffect(()=>{
    
    initial()
    console.log(ListaFuncionarios);
  },[ ])

  return (
    <main className='pt-4 px-8 h-screen max-w-5xl mx-auto'>
        
          <h1 className='font-semibold text-xl mb-2'>Lista de Funcionários</h1>
          <FuncionariosList lista={ListaFuncionarios as Funcionarios[]}/>
        
    </main>
  )
}

export default Funcionarios