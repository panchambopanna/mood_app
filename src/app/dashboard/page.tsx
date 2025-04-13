import Dashboad from '@/components/Dashboad';
import Login from '@/components/Login';
import Main from '@/components/Main';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Moodly · Dashboard",
  };


const page = () => {

    const isAuthenticated = true;

    let children = <Login />


    if (isAuthenticated) {
        children = <Dashboad />
    }

  return (
    <Main>
        {children}
    </Main>
  )
}

export default page