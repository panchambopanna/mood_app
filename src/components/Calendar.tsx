'use client'

import React, { useState } from 'react'
import {baseRating, gradients, months, daysList} from '@/utils'



 type Props = {
    demo?:boolean,
    data:Record<string, number> | null,
 }

const Calendar = ({demo, data}:Props) => {
    const now = new Date()
    const currMonth = now.getMonth()
    const [month, setMonth] = useState(Object.keys(months)[currMonth])
    const [year, setYear] = useState(now.getFullYear())

    
      const handleMonthChange = ():void => {
             
              // increment or decrement the month
              // if we hit the bounds of month then increment or decrement the year
      
          }

    const monthNow = new Date(year, Object.keys(months).indexOf(month), 1)
    const firstDayOfMonth = monthNow.getDay()
    const daysInMonth = new Date(year, Object.keys(months).indexOf(month) + 1, 0).getDate()

    const daysToDisplay = firstDayOfMonth + daysInMonth

    const numRows = (Math.floor(daysToDisplay / 7)) + (daysToDisplay % 7 ? 1 : 0)
        
  return (
    <div className='flex flex-col overflow-hidden gap-1'>
        {[...Array(numRows).keys()].map((row, rowIndex) => (
            <div key={rowIndex} className = 'grid grid-cols-7 gap-1'>
                {
                    daysList.map((dayOfWeek, dayOfWeekIndex) => {
                        const dayIndex = rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);

                        const dayDisplay = dayIndex > daysInMonth ? false : (row === 0 && dayOfWeekIndex < firstDayOfMonth) ? false : true

                        const isToday = dayIndex === now.getDate()

                        if(!dayDisplay) {
                            

                            return (
                                <div key={dayOfWeekIndex} />
                            )
                        } 

                        
                        const color = demo ? gradients.rose[baseRating[dayIndex]] : data && dayIndex in data ? gradients.rose[data[dayIndex]] : 'white';

                        return (
                        <div style={{background: color}} className={'text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ' 
                            + (isToday ? ' border-rose-400 ' : ' border-rose-100 ')
                        + (color === 'white' ? ' text-rose-400 ' : ' text-white ')} key={dayOfWeekIndex}>
                            {dayIndex}
                        </div>

                    )})}
            </div>
        ))}
    </div>
  )
}

export default Calendar