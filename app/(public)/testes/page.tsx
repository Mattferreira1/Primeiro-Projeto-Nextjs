"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { db } from '@/src/services/db'
import { Empresa } from '@/src/types/types'
import { collection, doc, getCountFromServer, getDocs, query, setDoc, where } from 'firebase/firestore'
import { redirect } from 'next/navigation'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
// Imports adicionados para animação e estado
import { motion, AnimatePresence } from 'framer-motion'

type Props = {}

// --- LÓGICA EXISTENTE (sem alterações) ---
const verifyCnpj=async (cnpj:string)=>{
  const coll = collection(db, "empresas");
  let q = query(coll,where("cnpj", "==", `${cnpj}`))
  const querySnapshot = await getDocs(q);
  let isValidCnpj
  if(querySnapshot.docs.length > 0){
      return isValidCnpj = false
    }else{
      return isValidCnpj = true
    }
}

// --- CONFIGURAÇÃO DAS ETAPAS ---
// Definimos as etapas, seus títulos, cores de fundo e os campos a serem validados
const stepsConfig = [
  {
    id: 0,
    title: 'Identificação',
    bgColor: 'bg-blue-50', // Cor suave para o fundo
    fields: ['razaoSocial', 'nomeComercial', 'cnpj', 'dataAbertura']
  },
  {
    id: 1,
    title: 'Endereço',
    bgColor: 'bg-green-50',
    fields: ['endereco.cep', 'endereco.logradouro', 'endereco.numero', 'endereco.bairro', 'endereco.cidade', 'endereco.estado', 'endereco.pais']
  },
  {
    id: 2,
    title: 'Contato',
    bgColor: 'bg-yellow-50',
    fields: ['contato.telefone', 'contato.email']
  },
  {
    id: 3,
    title: 'Operacional',
    bgColor: 'bg-purple-50',
    fields: ['dadosOperacionais.areaAtuacao', 'dadosOperacionais.porte', 'dadosOperacionais.status', 'dadosOperacionais.descricao']
  }
];

const testes = (props: Props) => {
  const user= useSelector((state:any)=> state.user.user)
  
  // --- NOVA LÓGICA DE ESTADO ---
  const [currentStep, setCurrentStep] = useState(0);

  const {
    register,
    handleSubmit,
    formState:{errors},
    setValue,
    trigger // Importante para validar etapas
  } = useForm<Empresa>()

  // --- LÓGICA EXISTENTE (sem alterações) ---
  const  onSubmit: SubmitHandler<Empresa> = async (data) => {
    const coll = collection(db, "empresas");
    const snapshot = await getCountFromServer(coll);
    let empresasQuantity = snapshot.data().count

    let isValid= await verifyCnpj(data.cnpj)
    if(isValid== false){
      alert("CNPJ já cadastrado, tente outro.");
      return
    }
    else{
      await setDoc(doc(db,"empresas", `${empresasQuantity + 1}`),data)
      .then(()=>alert("Empresa cadastrada com sucesso"))
      .then(redirect("/empresa"))
    }
  }

  // --- LÓGICA EXISTENTE (sem alterações) ---
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

  // --- NOVAS FUNÇÕES DE NAVEGAÇÃO ---
  const nextStep = async () => {
    // Valida os campos da etapa atual
    const fieldsToValidate = stepsConfig[currentStep].fields as (keyof Empresa)[];
    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      if (currentStep < stepsConfig.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // --- RENDERIZAÇÃO DA UI (totalmente nova) ---
  return (
    // 1. Fundo com cor suave e dinâmica
    <div className={`min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-500 ${stepsConfig[currentStep].bgColor}`}>
      
      {/* 2. Aba branca central */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 w-full max-w-4xl">
        
        {/* 3. Indicador de Etapas */}
        <div className="flex items-center mb-8">
          {stepsConfig.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {index + 1}
                </div>
                <span className={`mt-2 text-sm text-center ${index === currentStep ? 'font-bold text-blue-600' : 'text-gray-500'}`}>{step.title}</span>
              </div>
              {index < stepsConfig.length - 1 && (
                <div className={`flex-1 h-1 mx-4 transition-all ${index < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Formulário principal (só o 'submit' é acionado no final) */}
        <form onSubmit={handleSubmit(onSubmit)}>
          
          {/* 4. Container de Animação (deslize) */}
          <div className="overflow-hidden relative min-h-[400px]"> {/* Altura mínima para evitar 'pulo' na troca de etapas */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep} // A 'key' é essencial para o Framer Motion saber que o componente mudou
                initial={{ x: 300, opacity: 0 }} // Entra pela direita
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }} // Sai pela esquerda
                transition={{ type: 'spring', stiffness: 260, damping: 25 }}
              >
                {/* Renderização condicional da etapa atual */}

                {/* ETAPA 1: Identificação */}
                {currentStep === 0 && (
                  <section id="indentificacao">
                    <h1 className='text-lg text-start font-medium my-2'> Dados de identificação</h1>
                    <hr />
                    {/* ... (todo o seu JSX da <section id="indentificacao"> original vai aqui) ... */}
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
                )}

                {/* ETAPA 2: Endereço */}
                {currentStep === 1 && (
                  <section id="endereco">
                    <h1 className='text-lg text-start font-medium my-2'> Endereço</h1>
                    <hr />
                    {/* ... (todo o seu JSX da <section id="endereco"> original vai aqui) ... */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">

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
                       {/* ... (resto dos campos de endereço) ... */}
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
                  </section>
                )}

                {/* ETAPA 3: Contato */}
                {currentStep === 2 && (
                  <section id="contato">
                    <h2 className="text-lg font-semibold my-2">Contatos da Empresa</h2>
                    <hr />
                    {/* ... (todo o seu JSX da <section id="contato"> original vai aqui) ... */}
                     <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 my-1">
                          Telefone comercial
                        </label>
                        <Input
                          type="text"
                          placeholder="(00) 0000-0000"
                          className="px-3 py-2"
                          {...register("contato.telefone", { required: "O telefone é obrigatório" })}
                        />
                        {errors.contato?.telefone && (
                          <p className="text-red-500 text-sm">{errors.contato.telefone.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 my-1">
                          Celular / WhatsApp
                        </label>
                        <Input
                          type="text"
                          placeholder="(00) 90000-0000"
                          className="px-3 py-2"
                          {...register("contato.celular")}
                        />
                        {errors.contato?.celular && (
                          <p className="text-red-500 text-sm">{errors.contato.celular.message}</p>
                        )}
                      </div>
                       {/* ... (resto dos campos de contato) ... */}
                       <div>
                        <label className="block text-sm font-medium text-gray-700 my-1">
                          E-mail principal
                        </label>
                        <Input
                          type="email"
                          placeholder="contato@empresa.com"
                          className="px-3 py-2"
                          {...register("contato.email", { required: "O e-mail é obrigatório" })}
                        />
                        {errors.contato?.email && (
                          <p className="text-red-500 text-sm">{errors.contato.email.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 my-1">
                          E-mail financeiro
                        </label>
                        <Input
                          type="email"
                          placeholder="financeiro@empresa.com"
                          className="px-3 py-2"
                          {...register("contato.emailFinanceiro")}
                        />
                        {errors.contato?.emailFinanceiro && (
                          <p className="text-red-500 text-sm">{errors.contato.emailFinanceiro.message}</p>
                        )}
                      </div>

                      <div className="col-span-2 mb-4">
                        <label className="block text-sm font-medium text-gray-700 my-1">
                          Site da empresa (opcional)
                        </label>
                        <Input
                          type="text"
                          placeholder="https://www.suaempresa.com"
                          className="px-3 py-2"
                          {...register("contato.site")}
                        />
                        {errors.contato?.site && (
                          <p className="text-red-500 text-sm">{errors.contato.site.message}</p>
                        )}
                      </div>
                    </div>
                  </section>
                )}

                {/* ETAPA 4: Dados Operacionais */}
                {currentStep === 3 && (
                  <section id="dados-operacionais">
                    <h2 className="text-lg font-semibold my-2">Dados Operacionais</h2>
                    <hr />
                    {/* ... (todo o seu JSX da <section id="dados-operacionais"> original vai aqui) ... */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {/* Área de Atuação */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 my-1">
                          Área de Atuação
                        </label>
                        <Input
                          type="text"
                          placeholder="Ex: tecnologia, alimentos, transporte..."
                          className="px-3 py-2"
                          {...register("dadosOperacionais.areaAtuacao", {
                            required: "A área de atuação é obrigatória",
                          })}
                        />
                        {errors.dadosOperacionais?.areaAtuacao && (
                          <p className="text-red-500 text-sm">
                            {errors.dadosOperacionais.areaAtuacao.message}
                          </p>
                        )}
                      </div>

                      {/* Porte da Empresa */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 my-1">
                          Porte da Empresa
                        </label>
                        <select
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          {...register("dadosOperacionais.porte", {
                            required: "O porte é obrigatório",
                          })}
                        >
                          <option value="">Selecione...</option>
                          <option value="MEI">MEI</option>
                          <option value="ME">ME</option>
                          <option value="EPP">EPP</option>
                          <option value="LTDA">LTDA</option>
                          <option value="SA">S/A</option>
                        </select>
                        {errors.dadosOperacionais?.porte && (
                          <p className="text-red-500 text-sm">
                            {errors.dadosOperacionais.porte.message}
                          </p>
                        )}
                      </div>
                       {/* ... (resto dos campos operacionais) ... */}
                      {/* Status */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 my-1">
                          Status
                        </label>
                        <select
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          {...register("dadosOperacionais.status", {
                            required: "O status é obrigatório",
                          })}
                        >
                          <option value="">Selecione...</option>
                          <option value="Ativa">Ativa</option>
                          <option value="Inativa">Inativa</option>
                          <option value="Suspensa">Suspensa</option>
                        </select>
                        {errors.dadosOperacionais?.status && (
                          <p className="text-red-500 text-sm">
                            {errors.dadosOperacionais.status.message}
                          </p>
                        )}
                      </div>

                      {/* Descrição */}
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 my-1">
                          Descrição das Atividades
                        </label>
                        <textarea
                          placeholder="Breve descrição das atividades da empresa..."
                          className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none"
                          rows={4}
                          {...register("dadosOperacionais.descricao", {
                            required: "A descrição é obrigatória",
                          })}
                        />
                        {errors.dadosOperacionais?.descricao && (
                          <p className="text-red-500 text-sm">
                            {errors.dadosOperacionais.descricao.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </section>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

          {/* 5. Botões de Navegação */}
          <div className="mt-8 pt-6 border-t flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep} 
              disabled={currentStep === 0} // Desabilita o "Voltar" na primeira etapa
            >
              Voltar
            </Button>
            
            {currentStep < stepsConfig.length - 1 ? (
              // Botão de "Próximo" em todas as etapas, menos na última
              <Button 
                type="button" 
                variant="default" 
                onClick={nextStep}
              >
                Próximo
              </Button>
            ) : (
              // Botão de "Submit" (Cadastrar) apenas na última etapa
              <Button 
                type="submit" 
                variant="default"
              >
                Cadastrar empresa
              </Button>
            )}
          </div>

        </form>
      </div>
    </div>
  )
}

export default testes
