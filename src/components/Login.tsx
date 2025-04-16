import { Fugaz_One } from 'next/font/google';
import React from 'react'
import Input from './Input';
import Button from './Button';

const fugaz = Fugaz_One({ subsets: ["latin"], weight: "400",});

const Login = () => {
  const validateForm = (email:string, password:string):boolean => {
    // Add your validation logic here
    // For example, check if email is valid and password is strong enough
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/; // At least 8 characters, max 20 characters, 1 uppercase, 1 lowercase, 1 number, 1 number
    return emailRegex.test(email) && passwordRegex.test(password);
  } 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());


    const isValid = validateForm(data.email as string, data.password as string);
    
  
    console.log(isValid);
    console.log(data);
  }
  
  const passwordRules = [
    'Atleast 8 characters and maximum of 20 characters',
    'Atleast 1 number',
    'Atleast 1 uppercase',
    'Atleast 1 symbol'
  ]

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
    <h3 className={'text-4xl sm-text-5xl md:text-6xl ' + fugaz.className} >Log In / Register</h3>
    <p>You&#39;re one step away!</p>
    <form className='w-full max-w-[400px] mx-aut flex flex-col justify-center items-center gap-4' action="" method='post' onSubmit={handleSubmit}>
      <Input name='email' placeholder='Email' />
      <Input name='password' placeholder='Password' type='password' />
      <ul className='text-xs text-gray-400 text-left w-full'>
        {passwordRules.map((rule, index) => (<li key={index} className='flex items-start gap-2'><i>{rule}</i></li>))}
      </ul>
      <Button type='submit' text='Submit' full ></Button>
      <p>Don&#39;t have an account? <span className={'text-rose-600 '}>Sign up</span></p>
    </form>
    </div>
  )
}

export default Login