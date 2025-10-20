import React from 'react'
import { Button } from './ui/button'
import { redirect } from 'next/navigation'
type Empresa={
  id:string,
  nome:string,
  cnpj:string
}
type Props={
    empresa: Empresa
}

const CardEmpresa = (props:Props) => {
  return (
    <div className="w-full h-30 border-1 rounded-2xl p-4 flex transition-all duration-300 ease-in-out hover:bg-gray-100 " key={props.empresa.id}>
              <div className="w-8/12">
                <h2 className="text-sm font-medium text-gray-700">{props.empresa.nome}</h2>
              <p>Cnpj: {props.empresa.cnpj}</p>
              <div>
                tags:
              </div>
              </div>
              {/* <div className="flex flex-col gap-3">

                <Button onClick={()=>redirect(`/empresa/${props.empresa.id}/excluir`)} className="text-sm font-bold bg-green-500 border-2 border-green-600 cursor-pointer hover:bg-green-600">Editar</Button>

                <Button onClick={()=>redirect(`/empresa/${props.empresa.id}/excluir`)}className="font-bold text-sm bg-red-400 border-2 border-red-500 cursor-pointer hover:bg-red-500">Excluir</Button>

              </div> */}
            </div>
  )
}

export default CardEmpresa