'use client'
import {  db } from "@/src/services/db";
import { Button } from "@/components/ui/button"
import {  collectionGroup, getDoc, getDocs, query, where } from "firebase/firestore";
import { ChangeEvent, useContext, useState } from "react";
import { redirect } from "next/navigation";
import { Empresa, Usuario } from "@/src/types/types";
import * as InputField from "@/components/InputField/Index"
import { AtSign, Eye, EyeOff, Shield } from "lucide-react";
import { EmpresaContext } from "@/src/contexts/EmpresaContext";


type LoginResponse={
  data:{
    status:number
    empresa?:Empresa
    user?: Usuario,
    error?: string
  }
}


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<string| null>(null);
  const empresaContext = useContext(EmpresaContext)

  async function authenticate(e: any) {
    e.preventDefault();

    if(!email && !password){
      setError("Email ou senha faltando.")
      return
    }
    const response = await fetch("api/emplooyees/auth",{
      method:"POST",
      body:JSON.stringify({
        email:email,
        senha:password
      })
    })

    const {data} = await response.json() as LoginResponse
    
    if(data.error){
      setError(data.error)
      return
    }else{
      setError(null)
      localStorage.setItem("user", JSON.stringify(data.user));
      empresaContext?.setEmpresa(data.empresa!)
      redirect(`/empresa/${data.empresa!.id}`)

    }
    ///////////////////



    // const q = query(
    //   collectionGroup(db, "Funcionarios"),
    //   where("email", "==", email),
    //   where("senha", "==", password)
    // );
    // const snapshot = await getDocs(q);
    // if (snapshot.empty) {
    //   setError("Email ou senha incorretos, tente novamente.")
    //   return
    // } else {
    //   setError(null)
    //   const currentUser:Usuario={...snapshot.docs[0].data(),id:snapshot.docs[0].id } as Usuario
    //   const funcionarioDoc = snapshot.docs[0];
    //   const  empresaRef:any = funcionarioDoc.ref.parent.parent; 
    //   const empresaSnap = await getDoc(empresaRef);
    //   const empresa:Empresa = empresaSnap.data() as Empresa
      
      
    //   context?.addEmpresa(empresa)
    //   dispatch(userLogin(
    //     {
    //       id: `${currentUser.id}`,
    //       email:`${currentUser.email}`,
    //       password:`${currentUser.senha}`
    //   }
    // ))

    //   redirect(`/empresa/${empresaSnap.id}`)
    // }
}
  
  return (
    <main className="w-full h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 bg-white border border-gray-200 shadow-sm rounded-2xl flex flex-col">
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-6">
          Login 
        </h1>

        <form onSubmit={authenticate} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-900 mb-1"
            >
              E-mail
            </label>
            
            <InputField.Root
              onChange={(e:ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            >
              <InputField.Prefix icon={AtSign}/>
              <InputField.Control name="email" id="email" placeholder="Digite seu email" type="email"/>
            </InputField.Root>

          </div>

          {/* Senha */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-900 mb-1"
            >
              Senha
            </label>
            <div className="relative">
               <InputField.Root
              onChange={(e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            >
              <InputField.Prefix icon={Shield}/>
              <InputField.Control name="password" id="password" placeholder="Digite sua Senha" type={showPass ? "text" : "password"}/>
            </InputField.Root>

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-black"
              >
                {showPass ? 
                  <Eye className="h-5 w-5 text-zinc-500" /> :
                  <EyeOff className="h-5 w-5 text-zinc-500"/>
                }
              </button>
            </div>
          </div>
          <div className={`${error !== null ? "block" : "hidden"} mt-3`}>
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {error}
            </p>
          </div>
          {/* Botão */}
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg bg-slate-700 text-white font-medium hover:bg-slate-900 transition cursor-pointer mt-6"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
};


export default Login