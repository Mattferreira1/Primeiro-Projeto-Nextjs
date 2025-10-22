"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { db } from '@/src/services/db'
import { FormValues } from '@/src/types/types'
import { collection, doc, getCountFromServer, getDocs, query, setDoc, where } from 'firebase/firestore'
import { redirect } from 'next/navigation'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

type Props = {}

const cadastrar = (props: Props) => {
  const user= useSelector((state:any)=> state.user.user)
  const {
    register,
    handleSubmit,formState:{errors},
    setValue
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
      await setDoc(doc(db, "users", `${user.id}`,"empresas", `${snapshot.data().count +1}`),data)
      .then(()=>alert("Empresa cadastrada com sucesso"))
      .then(redirect("/empresas"))
    }
  }
  const CepChangeEvent= async(inputCep:string)=>{
    let data:any
    if(inputCep.length>=8){
     const APIreponse = await fetch(`https://viacep.com.br/ws/${inputCep}/json/`)
     const data = await APIreponse.json()
     console.log(data)
     setValue("endereco.logradouro", data.logradouro)
      setValue("endereco.bairro", data.bairro)
      setValue("endereco.cidade", data.localidade)
      setValue("endereco.estado", data.uf)
      
    }else{
      return
    }
    
  }
  
  return (

    <div className="w-11/12 m-auto shadow-2xs border-1 p-4 rounded-2xl grid grid-cols-1 gap-3 mt-3">
        <h1 className='text-lg text-center font-medium'> Cadastrar uma empresa</h1>
        <form onSubmit={handleSubmit(onSubmit)}>

          <section id="indentificacao">
            <h1 className='text-lg text-start font-medium my-2'> Dados de identificação</h1>
          <hr />

              <div className='my-3 w-9/12'>
                  <label htmlFor="" className="block text-sm font-medium text-gray-700 my-1">Razão Social</label>
                  <Input 
                  type="text" 
                  placeholder="Digite o nome oficial da empresa" 
                  className="px-3 py-2" 
                  {...register("razaoSocial",{required:"A razão social é obrigatória"})}
                  />
                  {errors.razaoSocial && <p className="text-red-500">{errors.razaoSocial.message}</p>}
              </div>

              <div className='my-3 w-9/12'>
                  <label htmlFor="" className="block text-sm font-medium text-gray-700 my-1">Nome comercial</label>
                  <Input 
                  type="text" 
                  placeholder="Digite o nome comercial da empresa" 
                  className="px-3 py-2" 
                  {...register("nomeComercial",{required:"o nome comercial é obrigatório"})}
                  />
                  {errors.nomeComercial && <p className="text-red-500">{errors.nomeComercial.message}</p>}
              </div>

              <div className='my-3'>
                <label htmlFor="" className="block text-sm font-medium text-gray-700 my-1">Cnpj</label>
                <Input 
                type="text" 
                placeholder="Digite o Cnpj" 
                className="px-3 py-2" 
                {...register("cnpj",{required:"O cnpj é obrigatório"})}
                />
                {errors.cnpj && <p className="text-red-500">{errors.cnpj.message}</p>}
              </div>

              <div className='my-3'>
                <label htmlFor="" className="block text-sm font-medium text-gray-700 my-1">Data de abertura</label>
                <Input 
                type="date" 
                className="px-3 py-2" 
                {...register("dataAbertura",{required:"A Data de abertura é obrigatória"})}
                />
                {errors.dataAbertura && <p className="text-red-500">{errors.dataAbertura.message}</p>}
              </div>
          </section>
          <hr />
          <section id="endereco">
  {/* --- ENDEREÇO --- */}
              <div className="my-4">
                <h1 className='text-lg text-start font-medium my-2'> Endereço</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                  {/* CEP */}
                  <div className="col-span-1 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 my-1">CEP</label>
                    <Input
                      type="text"
                      placeholder="00000-000"
                      className="px-3 py-2"
                      {
                        ...register("endereco.cep", { required: "O CEP é obrigatório",
                        onChange: (e) => {
                          CepChangeEvent(e.target.value)
                        }


                       })}
                    />
                    {errors.endereco?.cep && (
                      <p className="text-red-500 text-sm">{errors.endereco.cep.message}</p>
                    )}
                  </div>

                  {/* Logradouro */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 my-1">Logradouro</label>
                    <Input
                      type="text"
                      placeholder="Rua, avenida..."
                      className="px-3 py-2"
                      {...register("endereco.logradouro", { required: "O logradouro é obrigatório" })}
                    />
                    {errors.endereco?.logradouro && (
                      <p className="text-red-500 text-sm">{errors.endereco.logradouro.message}</p>
                    )}
                  </div>

                  {/* Número + Complemento */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 my-1">Número</label>
                    <Input
                      type="text"
                      placeholder="Nº"
                      className="px-3 py-2"
                      {...register("endereco.numero", { required: "O número é obrigatório" })}
                    />
                    {errors.endereco?.numero && (
                      <p className="text-red-500 text-sm">{errors.endereco.numero.message}</p>
                    )}
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 my-1">Complemento</label>
                    <Input
                      type="text"
                      placeholder="Apartamento, bloco, sala, etc."
                      className="px-3 py-2"
                      {...register("endereco.complemento")}
                    />
                  </div>

                  {/* Bairro, Cidade, Estado */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 my-1">Bairro</label>
                    <Input
                      type="text"
                      placeholder="Digite o bairro"
                      className="px-3 py-2"
                      {...register("endereco.bairro", { required: "O bairro é obrigatório" })}
                    />
                    {errors.endereco?.bairro && (
                      <p className="text-red-500 text-sm">{errors.endereco.bairro.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 my-1">Cidade</label>
                    <Input
                      type="text"
                      placeholder="Digite a cidade"
                      className="px-3 py-2"
                      {...register("endereco.cidade", { required: "A cidade é obrigatória" })}
                    />
                    {errors.endereco?.cidade && (
                      <p className="text-red-500 text-sm">{errors.endereco.cidade.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 my-1">UF</label>
                    <Input
                      type="text"
                      placeholder="ex: sp"
                      maxLength={2}
                      className="px-3 py-2 uppercase"
                      {...register("endereco.estado", { required: "O estado é obrigatório" })}
                    />
                    {errors.endereco?.estado && (
                      <p className="text-red-500 text-sm">{errors.endereco.estado.message}</p>
                    )}
                  </div>

                  {/* País */}
                  <div className="col-span-1 md:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 my-1">País</label>
                    <Input
                      type="text"
                      placeholder="ex :Brasil"
                      className="px-3 py-2"
                      defaultValue="Brasil"
                      {...register("endereco.pais", { required: "O país é obrigatório" })}
                    />
                    {errors.endereco?.pais && (
                      <p className="text-red-500 text-sm">{errors.endereco.pais.message}</p>
                    )}
                  </div>

                </div>
              </div>
          </section>
          <hr/>
          <Button variant="outline" type="submit" className=" mt-4 p-2 rounded cursor-pointer">Cadastrar empresa</Button>
      </form>
    </div>
  )
}

export default cadastrar