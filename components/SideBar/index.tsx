"use client"
import React, { useContext } from 'react'
import { NavButton } from './NavButton'
import { ChartColumn, Cog, Home, IdCardLanyard, LogOut, UserCircle2, Users } from 'lucide-react'
import { redirect } from 'next/navigation'

const Sidebar = () => {
  const NavButtons=[
    {
      icon:Home,
      title: "Home",
      linklista:[
      {
        name: "Home",
        href:"/"
      }
    ]
    },
    {
      icon:ChartColumn,
      title: "Dashboard",
      linklista:[
        {
          name:"Dashboard",
          href:"/dashboard"
        }
      ]
    }
    ,{
      icon:Users,
      title: "Setores",
      linklista:[
        {
          name:"Setores",
          href:"/sectors"
        }
      ]
    }
    ,{
      icon:IdCardLanyard,
      title: "Funcionários",
      linklista:[
        {
          name:"Todos os funcionários",
          href:"/funcionarios"
        },
        {
          name:"Cadastrar",
          href:"/funcionarios/cadastrar"
        }
      ]
    },
    {
      icon:Cog,
      title: "Configurações",
      linklista:[
        {
          name:"Opções",
          href:"/settings"
        }
      ]
    }

  ]

  // const localEmpresa = localStorage.getItem("empresa")
  // console.log(localEmpresa);
  
  // const currentEmpresa= JSON.parse(localEmpresa!)


  
  
  return (
    <aside className="h-screen border-l border-zinc-200 shadow-l-sm px-4 py-6 flex flex-col justify-between">
        <div className=" space-y-6">
          <h1 className="text-xl font-semibold text-zinc-700 pl-4">Gerencia Fácil</h1>

          <nav className="w-full space-y-2">
            {
              NavButtons.map((item,index)=>(
                <NavButton icon={item.icon} title={item.title}  links={item.linklista} key={index} 
                // idEmpresa={currentEmpresa.id}
                />
              ))
            }
              {/* <NavButton icon={Home} title="Home" />
              <NavButton icon={ChartColumn} title="Dashboard" />
              <NavButton icon={Users} title="Setores" />
              <NavButton icon={IdCardLanyard} title="Funcionários" />
              <NavButton icon={Cog} title="Configurações" /> */}
          </nav>
        </div>
        
        <nav className="">
            <div className="grid grid-cols-[1fr_minmax(7.5rem,_17.5rem)_1rem] gap-2 items-center">
              <UserCircle2 className="h-10
               w-10 text-zinc-700"/>
              <span className='truncate'>
                <span className="block text-sm text-zinc-700">Matheus</span>
                <span className="text-xs text-zinc-500 truncate">Matheus@gmail.comdsdsdsdsdsdsdsd</span>
              </span>
              <LogOut className="h-5 ml-0
               w-5 text-zinc-500" onClick={()=> redirect("/login")}/>
            </div>
        </nav>                
      </aside>
  )
}

export default Sidebar