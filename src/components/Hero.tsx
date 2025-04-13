import { Fugaz_One } from 'next/font/google';
import React from 'react'
import Button from './Button';
import Calendar from './Calendar';

const fugaz = Fugaz_One({ subsets: ["latin"], weight: "400",});

const Hero = () => {
  return (
    <div className='py-4 md:py-12 flex flex-col gap-4 sm:gap-8 '>
        <h1 className={'text-3xl sm:text-5xl md:text-7xl text-center ' + fugaz.className}>
            <span className='textGradient'>Moodly</span> helps you track your <span className='textGradient'>daily</span> mood!
        </h1>
        <p className='text-lg sm:text-xl md:text-2xl text-center w-full max-w-[700px] mx-auto'>Create a mood record and see how you feel <span className='font-semibold'>everyday of every year.</span></p>
       <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
       <Button text='Sign up'/>
       <Button text='Login' dark/>
       </div>
       <Calendar demo />
    </div>
  )
}

export default Hero