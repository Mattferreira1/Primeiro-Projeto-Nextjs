"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { db } from "@/src/services/db"
import { addDoc, collection, doc, getCountFromServer, getDocs, query, setDoc, where } from "firebase/firestore"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useState } from "react"
import { useForm, SubmitHandler  } from "react-hook-form"

type FormValues={
  nome:string,
  email:string,
  senha:string,
  cargo:string,
  cpf:string 
}

const page = () => {
  const [ showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,formState:{errors},
  } = useForm<FormValues>()

  const  onSubmit: SubmitHandler<FormValues> = async (data) => {

    
    const UsersRef = collection(db, "users")

    const q = query( UsersRef ,where("email", "==", data.email))

    const querySnapshot = await getDocs(q);
    
    if(querySnapshot.docs.length > 0){
      console.log("Email já cadastrado, tente outro.");
      
      return
    }else{
      const coll = collection(db, "users");
      const snapshot = await getCountFromServer(coll);
      
      const id = snapshot.data().count +1
      await setDoc(doc(db, "users", `${id}`),data).then(()=>{
        redirect("/login")
      })

      return
    }
  };
  return (
    <main className="flex items-center justify-center h-dvh">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[80%] flex flex-col gap-4 p-6 border rounded-md">
        <h1 className="text-2xl font-medium text-gray-700 m-auto">Registrar</h1>

        <div>
          <label htmlFor="" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
          <Input 
          type="text" 
          placeholder="Digite seu nome" 
          className="px-3 py-2" 
          {...register("nome",{required:"O nome é obrigatório"})}
          />
          {errors.nome && <p className="text-red-500">{errors.nome.message}</p>}
        </div>

        <div>
          <label htmlFor="" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
          <Input 
          type="email" 
          placeholder="Digite seu Email" 
          className="px-3 py-2"
          {...register("email",{required:"O email é obrigatório"})}
          
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
          <div className="relative border-1">
            <Input 
            type={showPassword ? "text": "password"} 
            placeholder="Digite seu senha"  
            className="px-3 py-2"
            {...register("senha",{required:"A senha é obrigatória"})}
            />
            <button className="absolute translate-y-3/12 -translate-x-[200%]"onClick={()=>{setShowPassword(!showPassword)}}>0</button>
          </div>
          {errors.senha && <p className="text-red-500">{errors.senha.message}</p>}
        </div>

        <div>
          <label htmlFor="" className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
          <Input 
          type="text"
          placeholder="Digite seu CPF" 
          className="px-3 py-2"
          {...register("cpf",{required:"O cpf é obrigatório"})}
          />
          {errors.cpf && <p className="text-red-500">{errors.cpf.message}</p>}
        </div>

        <div>
          <label htmlFor="" className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
          <Input 
          type="text" 
          placeholder="Digite seu cargo"
          className="px-3 py-2"
          {...register("cargo",{required:"O cargo é obrigatório"})}
          />
        {errors.cargo && <p className="text-red-500">{errors.cargo.message}</p>}
        </div>
        
        <Button variant="outline" type="submit" className=" mt-4 p-2 rounded">Criar conta</Button>
        

        <Link href="/login" className="text-blue-200 text-center">Retornar a página de login</Link>

      </form>
    </main>
  )
}

export default page