
"use client"
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/src/services/db'
import { Empresa } from '@/src/types/types'
import { Loader2 } from 'lucide-react' 
import DashboardEmpresa from '@/components/DashboradEmpresa'

export default function PaginaDashboardEmpresa() {
  const { empresaId } = useParams() 

  const [currentEmpresa, setCurrentEmpresa] = useState<Empresa | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {

    async function getEmpresa() {
      
      const id = Array.isArray(empresaId) ? empresaId[0] : empresaId

      if (!id) {
        setError("ID da empresa não fornecido.")
        setIsLoading(false)
        return
      }
      
      try {
        const empresaRef = doc(db, "empresas", id)
        const querySnapshot = await getDoc(empresaRef)
        
        if (querySnapshot.exists()) {
          const data = {...querySnapshot.data(), id:querySnapshot.id} as Empresa
          
        
          const empresaData: Empresa = {
            ...data,
            dataAbertura: new Date(data.dataAbertura),
          } as Empresa

          setCurrentEmpresa(empresaData)
        } else {
          console.log("Nenhum documento encontrado!")
          setError("Empresa não encontrada.")
          setCurrentEmpresa(null)
        }

      } catch (err: any) { 
        console.error("Erro ao buscar empresa:", err)
        setError(`Ocorreu um erro: ${err.message}`)
      } finally {
        setIsLoading(false)
      }
    }

    getEmpresa()
    
   
  }, [empresaId]) 

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <span className="ml-4 text-lg text-gray-700">Carregando dados...</span>
      </div>
    )
  }

  if (error || !currentEmpresa) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-red-600 text-center">
          {error || "Empresa não encontrada."}
        </p>
      </div>
    )
  }

  // 3. Sucesso: Renderiza o Dashboard
  return (
    <DashboardEmpresa empresa={currentEmpresa} />
  )
}