"use client"
import FuncionariosList from '@/components/FuncionariosList'

import type { Funcionario } from '@/src/types/types'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

const Funcionarios = () => {
const [ListaFuncionarios, setListaFuncionarios]= useState<Funcionario[] | null>()
  const {empresaId} = useParams()
  async function fetchUser(){

    const res= await fetch(`/api/emplooyees/${empresaId}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({
      //   "name": "matheus"
      // })
    })
    

    const data:Funcionario[] = await res.json()
    
    setListaFuncionarios(data)
  }
  
  useEffect(()=>{
    fetchUser()
  },[ ])

  return (
    <main className='pt-4 px-8 h-screen max-w-5xl mx-auto'>
        
          <h1 className='font-semibold text-xl mb-2'>Lista de Funcionários</h1>
          <FuncionariosList lista={ListaFuncionarios as Funcionario[]}/>
        
    </main>
  )
}

export default Funcionarios