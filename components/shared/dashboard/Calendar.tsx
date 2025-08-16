'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import {Calendar as CalendarIcon} from 'lucide-react';
const interviewSchedules = [
  "16 august 2025, 6:00 PM",
  "22 august 2025, 8:00 PM",
  "2 septembar 2025, 7:00 PM",
];



// Convert string dates to Date objects
const parseScheduledDays = (arr: string[]) =>
  arr.map((str) => {
    const [day, monthStr, year] = str.split(',')[0].trim().split(' ');
    const monthNames: { [key: string]: number } = {
      january:0, february:1, march:2, april:3, may:4, june:5,
      july:6, august:7, september:8, octomber:9, november:10, december:11,
      septembar:8 
    };
    return new Date(Number(year), monthNames[monthStr.toLowerCase()], Number(day)).getTime();
  });

const scheduledDays = parseScheduledDays(interviewSchedules);

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };



  return (
    <div className="p-2 bg-white  w-full max-w-md h-auto shadow-md rounded-lg">
     <h2 className='text-lg font-medium mb-4 flex items-center gap-2 text-blue-500'><CalendarIcon size={13}/> Interview Schedule</h2>
      

      <div className='py-2 px-2'>
        <div className="flex justify-between items-center mb-4">
        <button
          className="px-3 py-1 cursor-pointer rounded-md"
          onClick={handlePrevMonth}
        >
          <ChevronLeft size={15}/>
        </button>
        <div className="flex gap-2 items-center">
          <h2 className="text-lg font-semibold">
            {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
          </h2>
          <select
            value={currentYear}
            onChange={e => setCurrentYear(Number(e.target.value))}
            className="px-2 py-1 border rounded-md"
          >
            {Array.from({ length: 10 }, (_, i) => today.getFullYear() - 5 + i).map((yr) => (
              <option key={yr} value={yr}>{yr}</option>
            ))}
          </select>
        </div>
        <button
          className="px-3 py-1 cursor-pointer  rounded-md"
          onClick={handleNextMonth}
        >
          <ChevronRight size={15}/>
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-1 text-center font-semibold mb-1">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => <div key={d} className='text-blue-800/70 text-sm'>{d}</div>)}
      </div>

      {/* Empty cells for first day offset */}
      <div className="grid grid-cols-7 gap-4 text-center">
        {Array.from({ length: firstDay }).map((_, idx) => <div key={`empty-${idx}`} />)}

        {/* Render Days */}
        {daysArray.map((day) => {
          const currentDate = new Date(currentYear, currentMonth, day).getTime();
          const isScheduled = scheduledDays.includes(currentDate);
          return (
            <div
              key={day}
              className={`w-7 h-7 flex items-center justify-center  rounded-full  ${isScheduled ? 'bg-blue-500 text-white ' : ''}`}
               
            >
              {isScheduled ? (
                 <Link href={'/'}> {day}</Link>
              ) : (
                <span>{day}</span>
              )
              }
            </div>
          );
        })}
      </div>

      
      </div>

      
    </div>
  );
};

export default Calendar;
