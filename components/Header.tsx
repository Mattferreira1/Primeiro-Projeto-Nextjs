import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Link from "next/link";
const Header = () => {
  return (
    <header className="w-full text-center p-3 shadow-xs flex justify-between items">
          <span>Logo</span>
          <NavigationMenu>
            <NavigationMenuList className="gap-3">

              <NavigationMenuItem>
                <NavigationMenuLink asChild className="text-sm text-gray-500 p-0 hover:bg-transparent" >
                  <Link href="/empresas">Empresas</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className="text-sm text-gray-500 p-0 hover:bg-transparent" >
                  <Link href="/empresas/dashboard">Dashboard</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className="text-sm text-gray-500 p-0 hover:bg-transparent" >
                  <Link href="/">Menu</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

          </NavigationMenuList>
          </NavigationMenu>
      </header>
  )
}

export default Header