"use client"
import MainContainer from '@/components/MainContainer'
import { db } from '@/src/services/db'
import { Empresa } from '@/src/types/types'
import { collection, doc, getDoc, getDocs, query, QuerySnapshot, where } from 'firebase/firestore'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

type Props = {}
function page({}: Props) {
    const user = useSelector((state:any)=> state.user.user)

    const {empresaId} = useParams()

    const [CurrentEmpresa, setCurrentEmpresa] = useState<Empresa| null>(null)

    async function getEmpresa(){
        const empresaRef = doc(db, "users", `${user.id}`, "empresas", `${empresaId}`)
        
        const querySnapshot = await getDoc(empresaRef)
        const data= querySnapshot.data() as Empresa

        
        setCurrentEmpresa(data)
    }
    useEffect(()=>{
        getEmpresa()
      }, [ ])

      return (
    <MainContainer>
      <h1 className='text-lg font-medium text-center mb-1'>{CurrentEmpresa?.nome}</h1>
      <section className="min-w-11/12 min-h-80 m-auto shadow-2xs border-1 p-4 rounded-2xl gap-3">

      </section>
    </MainContainer>
  )
}

export default page