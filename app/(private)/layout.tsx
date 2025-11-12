"use client"
import Sidebar from "@/components/SideBar";
import { ProviderEmpresa } from "@/src/contexts/UserContext";



export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
      <div className="grid grid-cols-[minmax(7.5rem,_17.5rem)_1fr]">
          <Sidebar/>
          {/* <Header/> */}
        <main className=" h-screen overflow-y-scroll">
          {children}
        </main>
      </div>
  );
}

