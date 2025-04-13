import React, { PropsWithChildren } from 'react'



const Main = (props: PropsWithChildren) => {
    const { children } = props

  return (
    <main className='flex-1 p-4 sm:p-8'>{children}</main>
  )
}

export default Main