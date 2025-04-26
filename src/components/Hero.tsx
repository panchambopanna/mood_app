import { Fugaz_One } from 'next/font/google';
import React from 'react'
import Calendar from './Calendar';
import { demoData } from '@/utils';
import CallToAction from './CallToAction';

const fugaz = Fugaz_One({ subsets: ["latin"], weight: "400",});

const Hero = () => {
  return (
    <div className='py-4 md:py-12 flex flex-col gap-8 sm:gap-10 md:gap-14 '>
        <h1 className={'text-3xl sm:text-5xl md:text-7xl text-center ' + fugaz.className}>
            <span className='textGradient'>Moodly</span> helps you track your <span className='textGradient'>daily</span> mood!
        </h1>
        <p className='text-lg sm:text-xl md:text-2xl text-center w-full max-w-[700px] mx-auto'>Create a mood record and see how you feel <span className='font-semibold'>everyday of every year.</span></p>
       <CallToAction />
       <Calendar data={demoData} demo />
    </div>
  )
}

export default Hero