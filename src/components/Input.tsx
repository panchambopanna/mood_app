import React from 'react'

type Props = {
    label?: string;
    type?: string;
    placeholder?: string;
    name?:string;
    error?: string
}

const Input = ({label, type='text', placeholder, name, error}: Props) => {
  return (
      <>
      {label && <label htmlFor={name} className='text-sm font-semibold'>{label}</label>}
      <input className=' w-full duration-200 hover:border-rose-600  focus:border-rose-600 px-4 pt-2 sm:py-3 border-2 border-solid rounded-full border-rose-600 outline-none' name={name} id={name} type={type} placeholder={placeholder}/>
      {error && <i className="text-red-500 text-xs pb-2 text-align-left">{error}</i>}
    </>
  )
}

export default Input