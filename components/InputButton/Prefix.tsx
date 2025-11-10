import { ElementType } from "react"


type PrefixProps={
    icon: ElementType
}

const Prefix = ({icon:Icon}: PrefixProps)=>{
    return (
        <Icon className="h-5 w-5 text-zinc-500"/>
    )
}
export default Prefix