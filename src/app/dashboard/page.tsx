'use client'

import Dashboad from '@/components/Dashboad';
import Loading from '@/components/Loading';
import Login from '@/components/Login';
import Main from '@/components/Main';
import { useAuth } from '@/context/AuthContext';
import React from 'react'


const Page = () => {
    const {currentUser, loading} = useAuth()

    let children = <Login />

    if(loading){
        children = <Loading />

    }

    if (currentUser) {
        children = <Dashboad />
    }

  return (
    <Main>
        {children}
    </Main>
  )
}

export default Page