"use client"
import Header from "@/components/Header";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import authUser from "@/src/hooks/userAuth";
import Link from "next/link";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  authUser()
  
  return (
    <div className="relative">
      <Header/>
      {children}
    </div>
  );
}
