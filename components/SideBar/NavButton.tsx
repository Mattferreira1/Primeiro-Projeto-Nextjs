"use client"
import { ChevronDown } from "lucide-react"
import { ElementType, useState } from "react"
import {AnimatePresence, motion} from "framer-motion"
import Link from "next/link"

type NavButtonProps={
    title:string
    icon: ElementType,
    links:Array<{name:string, href:string}>
    idEmpresa?:number
}
export const NavButton = ({icon:Icon, title,links,idEmpresa }: NavButtonProps)=>{
    const [isOpened, setIsOpened]= useState(false)
    const height= (links.length*30)+ 32
    
    return(
        <div >
            <div className={`group flex items-center gap-3 rounded px-4 py-2 hover:bg-violet-50  cursor-pointer ${isOpened && "border-b border-zinc-200"}`} onClick={()=> setIsOpened(!isOpened)}>
                <Icon className="h-5 w-5 text-zinc-500"/>
                <span className="font-semibold text-zinc-700 group-hover:text-violet-500" >{title}</span>
                <ChevronDown className={`ml-auto h-5 w-5 text-zinc-400 transition-all duration-400 ${isOpened?"rotate-0":"-rotate-90"}`}/>
            </div>
            <AnimatePresence>
                {isOpened && 
                    <motion.div 
                        initial={{width:"100%",height:"0px"}}
                        animate={{width:"100%", height: `${height}px`}}
                        transition={{duration:0.3}}
                        exit={{width:"100%",height:"0px"}}
                        className={`bg-zinc-50 overflow-hidden px-4 rounded-b flex items-center`}
                        >
                            <div className="flex flex-col gap-1">
                                {
                                    links.map((link,index)=>(
                                        <Link  className="block font-medium text-sm text-zinc-500 hover:text-violet-700" key={index} 
                                        href={`/empresa/${idEmpresa+ link.href}`}
                                        >{link.name}
                                        </Link>
                                    ))
                                }
                            </div>
                    </motion.div>
                }
            </AnimatePresence>

        </div>
    )
}