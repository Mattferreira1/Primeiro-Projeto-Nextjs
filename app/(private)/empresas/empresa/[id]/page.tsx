"use client"
import { useParams } from 'next/navigation';
import React from 'react'
type Props = {}

const Empresa = (props: Props) => {
    const {id} = useParams()
    console.log(id);
    
    return (
    <main>
      <h1 className='text-xl font-medium text-gray-700'>Empresa</h1>
      
      <div></div>
    </main>
  )
}

export default Empresa