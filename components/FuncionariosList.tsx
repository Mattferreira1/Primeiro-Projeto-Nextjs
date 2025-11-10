import { Funcionarios } from '@/src/types/types'
import React from 'react'

type FuncionariosListProps = {
    lista: Funcionarios[]
}

const FuncionariosList = ({lista:ListaFuncionarios}: FuncionariosListProps) => {
  return (
    <table className="w-full">
            <thead>
              <tr className='w-full border'>
                <td className='px-3 py-1 text-center text-slate-700 font-semibold'>id</td>
                <td className='px-3 py-1 text-center text-slate-700 font-semibold'>nome</td>
                <td className='px-3 py-1 text-center text-slate-700 font-semibold'>setor</td>
                <td className='px-3 py-1 text-center text-slate-700 font-semibold'>status</td>
              </tr>
            </thead>
            <tbody>
              {
                ListaFuncionarios?.map((funcionario, index)=>(
                  <tr key={index} className='w-full border'>
                    <td className='px-3 py-1 text-center text-slate-700 font-semibold'>{funcionario.id}</td>
                    <td className='px-3 py-1 text-center text-slate-700 font-semibold'>{funcionario.nome}</td>
                    <td className='px-3 py-1 text-center text-slate-700 font-semibold'>{funcionario.email}</td>
                    <td className='px-3 py-1 text-center text-slate-700 font-semibold'>{funcionario.senha}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
  )
}

export default FuncionariosList