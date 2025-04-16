import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Moodly · Dashboard",
  };

type Props = {
    children: React.ReactNode
}

const layout = ({children}: Props) => {
  return (
    <>{children}</>
  )
}

export default layout