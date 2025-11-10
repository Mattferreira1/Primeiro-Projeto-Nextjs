import { ChevronDown } from "lucide-react"
import { ElementType } from "react"

type NavButtonProps={
    title:string
    icon: ElementType,
    linkTo:string
}
export const NavButton = ({icon:Icon, title,linkTo}: NavButtonProps)=>{
    return(
        <a href={linkTo} className="group flex items-center gap-3 rounded px-4 py-2 hover:bg-violet-50">
            <Icon className="h-5 w-5 text-zinc-500"/>
            <span className="font-semibold text-zinc-700 group-hover:text-violet-500">{title}</span>
            <ChevronDown className="ml-auto h-5 w-5 text-zinc-400"/>
        </a>
    )
}