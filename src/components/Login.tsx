import { Fugaz_One } from 'next/font/google';
import React from 'react'
import Input from './Input';
import Button from './Button';

const fugaz = Fugaz_One({ subsets: ["latin"], weight: "400",});

const Login = () => {
  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
    <h3 className={'text-4xl sm-text-5xl md:text-6xl ' + fugaz.className} >Log In / Register</h3>
    <p>You&#39;re one step away!</p>
    <form className='w-full max-w-[400px] mx-aut flex flex-col justify-center items-center gap-4' action="" method='post'>
      <Input name='email' placeholder='Email' />
      <Input name='password' placeholder='Password' type='password' />
      <Button type='submit' text='Submit' full ></Button>
      <p>Don&#39;t have an account? <span className={'text-rose-600 '}>Sign up</span></p>
    </form>
    </div>
  )
}

export default Login