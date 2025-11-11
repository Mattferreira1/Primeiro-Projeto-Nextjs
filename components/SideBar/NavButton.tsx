"use client"
import { ChevronDown } from "lucide-react"
import { ElementType, useState } from "react"
import {AnimatePresence, motion} from "framer-motion"

type NavButtonProps={
    title:string
    icon: ElementType,
}
export const NavButton = ({icon:Icon, title}: NavButtonProps)=>{
    const [isOpened, setIsOpened]= useState(false)
    return(
        <div >
            <div className={`group flex items-center gap-3 rounded px-4 py-2 hover:bg-violet-50  cursor-pointer ${isOpened && "border-b border-zinc-200"}`} onClick={()=> setIsOpened(!isOpened)}>
                <Icon className="h-5 w-5 text-zinc-500"/>
                <span className="font-semibold text-zinc-700 group-hover:text-violet-500" >{title}</span>
                <ChevronDown className="ml-auto h-5 w-5 text-zinc-400"/>
            </div>
            <AnimatePresence>
                {isOpened && 
                    <motion.div 
                        initial={{width:"100%",height:"0px"}}
                        animate={{width:"100%", height:"7rem"}}
                        transition={{duration:0.3}}
                        exit={{width:"100%",height:"0px"}}
                        className={`bg-zinc-50 overflow-hidden px-4 rounded-b flex items-center`}
                        >
                            <ol>
                                <li>
                                    <a href="/link">link</a>
                                </li>
                                <li>1</li>
                                <li>1</li>
                            </ol>
                    </motion.div>
                }
            </AnimatePresence>

        </div>
    )
}