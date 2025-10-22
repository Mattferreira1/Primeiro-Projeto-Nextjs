'use client'
import { auth, db } from "@/src/services/db";
import { Button } from "@/components/ui/button"
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "@/redux/User/userSlice";

type CurrentUser={
  id:string,
  email:string,
  senha:string
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  async function autenticate(e: any) {
    e.preventDefault();
    const q = query(
      collection(db, "users"),
      where("email", "==", email),
      where("senha", "==", password)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      setError(true)
      return
    } else {
      setError(false)
      const currentUser:CurrentUser={...snapshot.docs[0].data(),id:snapshot.docs[0].id } as CurrentUser
      
      dispatch(userLogin(
        {
          id: `${currentUser.id}`,
          email:`${currentUser.email}`,
          password:`${currentUser.senha}`
      }
    ))
      redirect(`/empresas`)
    }
  }

  return (
    <main className="w-full h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 bg-white border border-gray-200 shadow-sm rounded-2xl flex flex-col">
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-6">
          Login 
        </h1>
        
            

        <form onSubmit={autenticate} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              E-mail
            </label>
            <Input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              placeholder="Digite seu e-mail"
            />
          </div>

          {/* Senha */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Senha
            </label>
            <div className="relative">
              <Input
                type={showPass ? "text" : "password"}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                placeholder="Digite sua senha"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-black"
              >
                {showPass ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>
          <div className={`${error ? "block" : "hidden"} mt-3`}>
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              E-mail ou senha incorretos.
            </p>
          </div>
          {/* Botão */}
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg bg-black text-white font-medium hover:bg-gray-900 transition cursor-pointer"
          >
            Entrar
          </button>
          <Button variant="outline" className="bg-transparent cursor-pointer" onClick={()=> redirect("/register")}>Criar conta</Button>
        </form>
      </div>
    </main>
  );
};


export default Login