import { ComponentProps } from "react"

type ControlProps= ComponentProps<"input">


const Control = (props:ControlProps) =>{
  return <input {...props} className="w-full text-sm font-medium text-zinc-500 focus:text-zinc-700 focus:outline-none "/>
}


export default Control