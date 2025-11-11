"use client";
import { db } from "@/services/db";
import { Button } from "@/components/ui/button";
import {
  collectionGroup,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { ChangeEvent, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import { userLogin } from "@/redux/User/userSlice";
import { CurrentUser } from "@/types/types";
import * as InputButton from "@/components/InputButton/Index";
import { AtSign, Eye, EyeOff, Shield } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/api/emplooyers", { method: "GET" });
  }, []);

  async function onSubmit(e: any) {
    e.preventDefault();

    if (!email && !password) {
      setError("Email ou senha faltando.");
      return;
    }
    console.log(123);

    const q = query(
      collectionGroup(db, "Funcionarios"),
      where("email", "==", email),
      where("senha", "==", password)
    );
    const snapshot = await getDocs(q);
    console.log(snapshot);
    if (snapshot.empty) {
      setError("Email ou senha incorretos, tente novamente.");
      return;
    } else {
      setError(null);
      const currentUser: CurrentUser = {
        ...snapshot.docs[0].data(),
        id: snapshot.docs[0].id,
      } as CurrentUser;
      const funcionarioDoc = snapshot.docs[0];
      const empresaRef = funcionarioDoc.ref.parent.parent;
      const empresaSnap = await getDoc(empresaRef);
      dispatch(
        userLogin({
          id: `${currentUser.id}`,
          email: `${currentUser.email}`,
          password: `${currentUser.senha}`,
        })
      );
      // const queryUser= query(collection(db, "empresas"),where("email"))
      // const snapshot= getDocs(queryUser)

      redirect(`/empresa/${empresaSnap.id}`);
    }
  }

  return (
    <main className="w-full h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 bg-white border border-gray-200 shadow-sm rounded-2xl flex flex-col">
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-6">
          Login
        </h1>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              E-mail
            </label>

            <InputButton.Root
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            >
              <InputButton.Prefix icon={AtSign} />
              <InputButton.Control
                name="email"
                id="email"
                placeholder="Digite seu email"
                type="email"
              />
            </InputButton.Root>
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
              <InputButton.Root
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              >
                <InputButton.Prefix icon={Shield} />
                <InputButton.Control
                  name="password"
                  id="password"
                  placeholder="Digite sua Senha"
                  type={showPass ? "text" : "password"}
                />
              </InputButton.Root>

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-black"
              >
                {showPass ? (
                  <Eye className="h-5 w-5 text-zinc-500" />
                ) : (
                  <EyeOff className="h-5 w-5 text-zinc-500" />
                )}
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
            className="w-full py-2 px-4 rounded-lg bg-black text-white font-medium hover:bg-gray-900 transition cursor-pointer"
          >
            Entrar
          </button>
          <Button
            variant="outline"
            className="bg-transparent cursor-pointer"
            onClick={() => redirect("/register")}
          >
            Criar conta
          </Button>
        </form>
      </div>
    </main>
  );
};

export default Login;
