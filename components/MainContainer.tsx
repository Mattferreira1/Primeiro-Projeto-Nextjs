import React from 'react'

type Props = {
    children: React.ReactNode
}

const MainContainer = ({children}: Props) => {
  return (
    <main className="p-4 relative">
        {children}
    </main>
  )
}

export default MainContainer