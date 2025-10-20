"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { db } from '@/src/services/db'
import { collection, doc, getCountFromServer, getDocs, query, setDoc, where } from 'firebase/firestore'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type Props = {}

type FormValues={
  nome:string,
  cnpj:string,
}

const cadastrar = (props: Props) => {
  const {
    register,
    handleSubmit,formState:{errors},
  } = useForm<FormValues>()

  const  onSubmit: SubmitHandler<FormValues> = async (data) => {

    const coll = collection(db, "empresas");
    const snapshot = await getCountFromServer(coll);
    let q = query(coll,where("cnpj", "==", `${data.cnpj}`))
    const querySnapshot = await getDocs(q);
    
    if(querySnapshot.docs.length > 0){
      alert("CNPJ já cadastrado, tente outro.");
      return
    }
    else{
      await setDoc(doc(db, "empresas",`${snapshot.data().count +1}`),data).then(()=>alert("empresa cadastrada com sucesso"))
    }
  }

  return (
    <div className="w-11/12 m-auto shadow-2xs border-1 p-4 rounded-2xl grid grid-cols-1 gap-3 mt-3">
        <h1 className='text-lg text-center font-medium'> Cadastrar uma nova empresa</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='my-3 w-9/12'>
                <label htmlFor="" className="block text-sm font-medium text-gray-700 my-1">Nome</label>
                <Input 
                type="text" 
                placeholder="Digite seu nome" 
                className="px-3 py-2" 
                {...register("nome",{required:"O nome é obrigatório"})}
                />
                {errors.nome && <p className="text-red-500">{errors.nome.message}</p>}
            </div>

            <div className='my-3'>
              <label htmlFor="" className="block text-sm font-medium text-gray-700 my-1">CNPJ</label>
              <Input 
              type="text" 
              placeholder="Digite o CNPJ" 
              className="px-3 py-2" 
              {...register("cnpj",{required:"O cnpj é obrigatório"})}
              />
              {errors.cnpj && <p className="text-red-500">{errors.cnpj.message}</p>}
            </div>

            <Button variant="outline" type="submit" className=" mt-4 p-2 rounded cursor-pointer">Criar conta</Button>

        </form>
        </div>
  )
}

export default cadastrar