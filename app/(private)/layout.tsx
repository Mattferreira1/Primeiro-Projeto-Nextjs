"use client"
import Sidebar from "@/components/SideBar";
import authUser from "@/src/hooks/userAuth";


export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  authUser()
  
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

