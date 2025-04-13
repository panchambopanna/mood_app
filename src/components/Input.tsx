import React from 'react'

type Props = {
    label?: string;
    type?: string;
    placeholder?: string;
    name?:string;
}

const Input = ({label, type='text', placeholder, name}: Props) => {
  return (
      <>
      {label && <label htmlFor={name} className='text-sm font-semibold'>{label}</label>}
      <input className=' w-full duration-200 hover:border-rose-600  focus:border-rose-600 px-4 py-2 sm:py-3 border-2 border-solid rounded-full border-rose-600 outline-none' name={name} id={name} type={type} placeholder={placeholder}/>
    </>
  )
}

export default Input