// Defina este arquivo como: app/empresa/[empresaId]/page.tsx
"use client"

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/src/services/db' // Verifique se o caminho está correto
import { Empresa } from '@/src/types/types' // Verifique se o caminho está correto
// Importe o dashboard
import { Loader2 } from 'lucide-react' // (Opcional) Para um ícone de loading
import DashboardEmpresa from '@/components/DashboradEmpresa'
// Componente da Página Dinâmica
export default function PaginaDashboardEmpresa() {
  const { empresaId } = useParams() // Pega o [empresaId] da URL

  // Estados para controlar o carregamento e os dados
  const [currentEmpresa, setCurrentEmpresa] = useState<Empresa | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // A função que você criou, agora dentro do useEffect
    async function getEmpresa() {
      // Garante que o ID é uma string (useParams pode retornar string | string[])
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
          const data = {...querySnapshot.data(), id:querySnapshot.id}
          
          
          // --- CORREÇÃO APLICADA AQUI ---
          // O dado vindo do Firestore é uma string (ex: "2025-11-04").
          // Convertemos para um objeto Date.
          const empresaData: Empresa = {
            ...data,
            dataAbertura: new Date(data.dataAbertura), // <-- MUDANÇA
          } as Empresa

          console.log(empresaData)
          setCurrentEmpresa(empresaData)
        } else {
          console.log("Nenhum documento encontrado!")
          setError("Empresa não encontrada.")
          setCurrentEmpresa(null)
        }

      } catch (err: any) { // Captura o erro para depuração
        console.error("Erro ao buscar empresa:", err)
        setError(`Ocorreu um erro: ${err.message}`)
      } finally {
        setIsLoading(false)
      }
    }

    getEmpresa()
    
    // O useEffect deve rodar novamente se o empresaId mudar
  }, [empresaId]) 

  // --- Renderização Condicional ---

  // 1. Estado de Carregamento
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <span className="ml-4 text-lg text-gray-700">Carregando dados...</span>
      </div>
    )
  }

  // 2. Estado de Erro ou Não Encontrado
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