import React from 'react'
import {baseRating, gradients, demoData} from '@/utils'

const months = { 'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr', 'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug', 'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec' }
 const now = new Date();

 const daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; 

 type Props = {
    demo?:boolean
 }

const Calendar = ({demo}:Props) => {

    const year = 2025
    const month = 'April'

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

                        
                        const color = demo ? gradients.rose[baseRating[dayIndex]] : dayIndex in demoData ? gradients.rose[demoData[dayIndex]] : 'white';

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