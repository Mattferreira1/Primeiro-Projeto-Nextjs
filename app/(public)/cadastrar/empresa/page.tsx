"use client"
import { Empresa } from '@/src/types/types'
import React, { useState } from 'react'
import { FieldPath, useForm } from 'react-hook-form'
import * as InputField from "@/components/InputField/Index"
import {motion} from "framer-motion"

const CadastrarEmpresa = () => {
    const [currentStep, setCurrentStep]= useState(1)

    const {
        register,
        handleSubmit,
        formState:{errors},
        trigger
      } = useForm<Empresa>()
      const onSubmit= async(data:Empresa)=>{
        
      }
      
      type formStepsType= Array<{
        step:number, 
        name: string, 
        fields: FieldPath<Empresa>[]}>

      const formSteps:formStepsType =[
        {
            step:1,
            name:"Dados de identificação",
            fields:["razaoSocial","nomeComercial","dataAbertura","cnpj"]
        },
        {
            step:2,
            name:"Endereço",
            fields:["endereco.cep", "endereco.logradouro","endereco.numero","endereco.complemento","endereco.bairro","endereco.cidade","endereco.estado","endereco.pais"]
        },
        {
            step:3,
            name:"Contato",
            fields:[]
        },
        {
            step:4,
            name:"Dados Operacionais",
            fields:[]
        },
      ]

      const validateFields = async(currentStep:number)=>{
        let steps= formSteps[currentStep-1].fields
        const IsValid = await trigger(steps )
        if(!IsValid){
            console.log("preencha os campos obrigatórios");
            return
        }
        console.log("proxima etapa");
        
      }
      

  return (
    <div className='w-screen h-screen bg-zinc-300 flex justify-center items-center'>
        <div className='bg-zinc-50 h-190 w-9/10 max-w-4xl p-3 rounded-md border border-zinc-300 shadow-sm flex flex-col gap-4'>
            <h1 className='text-xl font-semibold text-center my-2'>Cadastro de empresa</h1>

            <section className='w-full h-20 py-2 flex justify-around items-start gap-6'>
                {
                    formSteps.map((field, index)=>(
                        <div key={index} className='flex flex-col items-center max-w-15'>
                            <div className={`w-10 h-10  shadow-sm border rounded-full flex items-center justify-center text-sm font-semibold ${field.step == currentStep ? "bg-violet-500 text-zinc-200": "bg-zinc-300 border-zinc-300"}`}>
                                {field.step}
                            </div>
                            <p className='font-semibold text-xs text-center '>{field.name}</p>
                        </div>
                    ))
                }
            </section>

            <form
            onSubmit={handleSubmit(onSubmit)} 
            action="" 
            className='max-h-full h-full overflow-hidden'>
                {
                    currentStep == 1 &&(
                        <motion.div
                        initial={{translateX:"400%"}}
                        animate={{translateX:0}}
                        exit={{translateX:"-400%"}}
                        transition={{duration:1 }}
                        className='px-4 py-5 flex flex-col gap-4 '>

                            <h1 className='text-lg font-medium'>{formSteps[currentStep-1].name}</h1>
                            <div>
                                <label
                                htmlFor="razaoSocial"
                                className="block text-sm font-medium text-slate-900 mb-1"
                                >
                                    Razão social
                                </label>
                                <InputField.Root >
                                    <InputField.Control 
                                    type='text' 
                                    id='razaoSocial' 
                                    placeholder='Digite a razão social da sua empresa'
                                    {...register("razaoSocial", {required:"A razão social é obrigatória."})}
                                    />
                                </InputField.Root>
                            </div>

                            <div>
                                <label
                                htmlFor="nomeComercial"
                                className="block text-sm font-medium text-slate-900 mb-1"
                                >
                                   Nome comercial
                                </label>
                                <InputField.Root >
                                    <InputField.Control 
                                    type='text' 
                                    id='nomeComercial' 
                                    placeholder='Digite o nome comercial da sua empresa'
                                    {...register("nomeComercial", {required:"O nome comercial é obrigatório"})}
                                    />
                                </InputField.Root>
                            </div>

                            <div>
                                <label
                                htmlFor="dataAbertura"
                                className="block text-sm font-medium text-slate-900 mb-1"
                                >
                                    Data abertura
                                </label>
                                <InputField.Root >
                                    <InputField.Control 
                                    type='date' 
                                    id='dataAbertura' 
                                    {...register("dataAbertura",{required:"A data de abertura é obrigatória."})}
                                    />
                                </InputField.Root>
                            </div>

                            <div>
                                <label
                                htmlFor="cnpj"
                                className="block text-sm font-medium text-slate-900 mb-1"
                                >
                                    Cnpj
                                </label>
                                <InputField.Root >
                                    <InputField.Control 
                                    type='text' 
                                    id='cnpj' 
                                    placeholder='Digite o cnpj da sua empresa'
                                    {...register("cnpj", {required:"O cnpj da sua empresa é obrigatório"})}
                                    />
                                </InputField.Root>
                            </div>
                            
                        </motion.div>
                    )
                }
                {
                    currentStep == 2 &&(
                        <motion.div
                        initial={{translateX:"400%"}}
                        animate={{translateX:0}}
                        exit={{translateX:"-400%"}}
                        transition={{duration:1 }}
                        className='px-4 py-5 flex flex-col gap-4 '>

                            <h1 className='text-lg font-medium'>{formSteps[currentStep-1].name}</h1>
                            <div className='grid grid-cols-[75%_25%] gap-3'>
                                <div>
                                    <label
                                    htmlFor="endereco.cep"
                                    className="block text-sm font-medium text-slate-900 mb-1"
                                    >
                                        CEP
                                    </label>
                                    <InputField.Root >
                                        <InputField.Control 
                                        type='text' 
                                        id='endereco.cep' 
                                        placeholder='Digite o cep'
                                        {...register("endereco.cep", {required:"O cep é obrigatório."})}
                                        />
                                    </InputField.Root>
                                </div>

                                <div>
                                    <label
                                    htmlFor="endereco.pais"
                                    className="block text-sm font-medium text-slate-900 mb-1"
                                    >
                                        País
                                    </label>
                                    <InputField.Root >
                                        <InputField.Control 
                                        type='text' 
                                        id='endereco.pais' 
                                        placeholder='Digite o pais'
                                        defaultValue={"Brasil"}
                                        {...register("endereco.pais", {required:"O pais é obrigatório."})}
                                        />
                                    </InputField.Root>
                                </div>
                            </div>

                            <div className='grid grid-cols-2 gap-3'>
                                
                                <div>
                                    <label
                                    htmlFor="endereco.logradouro"
                                    className="block text-sm font-medium text-slate-900 mb-1"
                                    >
                                    Logradouro
                                    </label>
                                    <InputField.Root >
                                        <InputField.Control 
                                        type='text' 
                                        id='endereco.logradouro' 
                                        placeholder='Digite o logradouro da sua empresa'
                                        {...register("endereco.logradouro", {required:"O logradouro é obrigatória"})}
                                        />
                                    </InputField.Root>
                                </div>

                                <div>
                                    <label
                                    htmlFor="endereco.bairro"
                                    className="block text-sm font-medium text-slate-900 mb-1"
                                    >
                                        Bairro
                                    </label>
                                    <InputField.Root >
                                        <InputField.Control 
                                        type='text' 
                                        id='endereco.bairro' 
                                        placeholder='Digite o bairro'
                                        {...register("endereco.bairro", {required:"O bairro é obrigatório"})}
                                        />
                                    </InputField.Root>    
                                </div>

                            </div>

                            <div className='grid grid-cols-[80%_20%] gap-3'>
                                <div>
                                    <label
                                    htmlFor="endereco.complemento"
                                    className="block text-sm font-medium text-slate-900 mb-1"
                                    >
                                        Complemento
                                    </label>
                                    <InputField.Root >
                                        <InputField.Control 
                                        type='text' 
                                        id='endereco.complemento' 
                                        placeholder='Ex: "Apartamento", "Casa", "bloco", ...'
                                        {...register("endereco.complemento", {required:"O complemento é obrigatório"})}
                                        />
                                    </InputField.Root>
                                </div>

                                <div>
                                    <label
                                    htmlFor="endereco.numero"
                                    className="block text-sm font-medium text-slate-900 mb-1"
                                    >
                                        Número
                                    </label>
                                    <InputField.Root >
                                        <InputField.Control 
                                        type='number' 
                                        id='endereco.numero' 
                                        placeholder='Ex: 15'
                                        {...register("endereco.numero",{required:"O número é obrigatório."})}
                                        />
                                    </InputField.Root>
                                </div>
                            </div>
                                
                            <div className='grid grid-cols-2 gap-3'>

                                <div>
                                    <label
                                    htmlFor="endereco.cidade"
                                    className="block text-sm font-medium text-slate-900 mb-1"
                                    >
                                        Cidade
                                    </label>
                                    <InputField.Root >
                                        <InputField.Control 
                                        type='text' 
                                        id='endereco.cidade' 
                                        placeholder='Digite a cidade'
                                        {...register("endereco.cidade", {required:"A cidade é obrigatória"})}
                                        />
                                    </InputField.Root>    
                                </div>

                                <div>
                                    <label
                                    htmlFor="endereco.estado"
                                    className="block text-sm font-medium text-slate-900 mb-1"
                                    >
                                        Estado
                                    </label>
                                    <InputField.Root >
                                        <InputField.Control 
                                        type='text' 
                                        id='endereco.estado' 
                                        placeholder='Digite o Estado'
                                        {...register("endereco.estado", {required:"O estado é obrigatório"})}
                                        />
                                    </InputField.Root>    
                                </div>

                            </div>
                            
                        </motion.div>
                    )
                }
            </form>

            <section className='w-full px-3 py-2 h-15 flex gap-2'>

                <button className='w-1/2 text-center bg-violet-400 px-3 py-2 rounded font-medium text-zinc-50 border border-zinc-300 shadow-sm'onClick={currentStep > 1? ()=>setCurrentStep(currentStep-1): undefined }>Voltar</button>

                <button className='w-1/2 text-center bg-violet-400 px-3 py-2 rounded font-medium text-zinc-50 border border-zinc-300 shadow-sm' onClick={currentStep < formSteps.length? ()=>setCurrentStep(currentStep+1): undefined }>Avançar</button>

            </section>

        </div>
    </div>
  )
}

export default CadastrarEmpresa