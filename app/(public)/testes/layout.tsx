"use client"
import { NavButton } from "@/components/SideBar/NavButton"; 
import authUser from "@/src/hooks/userAuth";
import { ChevronDown, Cog } from "lucide-react";


export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  authUser()
  
  return (
    <div className="grid grid-cols-[minmax(7.5rem,_17.5rem)_1fr]">
      <aside className="h-screen border px-4 py-6">
        <div className=" space-y-6">
            <h1 className="text-xl font-semibold text-zinc-700 pl-4">Gerencia Fácil</h1>

            {/* <div className="">
                <Cog className="h-5 w-5 text-zinc-500"/>
                <input type="text" />
            </div> */}

            <nav className="w-full space-y-2">
                <NavButton icon={Cog} title="Settings" linkTo="empresa/2/funcionarios"/>
                <NavButton icon={Cog} title="Settings" linkTo="/settings"/>
                <NavButton icon={Cog} title="Settings" linkTo="/settings"/>
                <NavButton icon={Cog} title="Settings" linkTo="/settings"/>
            </nav>

            <nav>
                
            </nav>

                
        </div>
      </aside>
        {/* <Header/> */}
      <main>
        {children}
      </main>
    </div>
  );
}
