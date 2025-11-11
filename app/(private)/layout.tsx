import Sidebar from "@/components/SideBar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-[minmax(7.5rem,17.5rem)_1fr]">
      <Sidebar />
      {/* <Header/> */}
      <main className=" h-screen overflow-y-scroll">{children}</main>
    </div>
  );
}
