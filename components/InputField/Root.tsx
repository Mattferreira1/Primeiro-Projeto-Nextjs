import React, { ComponentProps } from 'react'



type RootProps = ComponentProps<"div">

export const Root = (props: RootProps) => {
  return (
    <div {...props} className='px-3 py-2 rounded-md border border-zinc-300 shadow-sm flex gap-2'/>
  )
}

export default Root