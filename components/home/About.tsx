import { cn } from '@/lib/utils'
import React from 'react'
import { motion } from "motion/react"

export const About = () => {
  return (
    <div className='w-full  flex my-10 0 px-10 py-5  bg-neutral-50 rounded-2xl '>

      <section className="flex flex-col items-center justify-center gap-2 w-1/3">
        <h2 className="text-3xl font-bold">Explore Over 1.3 Million Job Vacancies Waiting for You!</h2>
        <p className="text-sm text-gray-600 max-w-2xl">
          Browse our extensive job listings and discover opportunities tailored just for you. Start your journey today and turn your dream job into a reality!
        </p>
      </section>


      <div className='flex items-center justify-center w-full flex-1 '>
        <div className=' flex flex-col items-start justify-center gap-10 mt-10  w-2/3 relative'>
          <div className=' relative'>
            <ArrowRight className='top-[90.8%] right-[-200px] ' />
            <div className='w-80 h-44 relative z-50 bg-green-50 shadow-lg border border-neutral-300 rounded-md  flex flex-col items-start justify-center  px-4 gap-4 '>
              <h2 className='text-2xl font-semibold text-neutral-900 '>Explore Job Openings</h2>
              <p className='text-sm text-neutral-600 '>Explore a wide array of exciting job openings across various industries that pique your interest and inspire your career ambitions.</p>
            </div>
          </div>


          <div className='relative self-end'>
            <ArrowLeft className='top-[90.8%] left-[-200px]  ' />
            <div className='self-end bg-white w-80 h-44 z-50 relative shadow-lg border border-neutral-300 rounded-md  flex flex-col items-start justify-center  px-4 gap-4   '>
              <h2 className='text-2xl font-semibold text-neutral-900 '>Explore Job Openings</h2>
              <p className='text-sm text-neutral-600 '>Explore a wide array of exciting job openings across various industries that pique your interest and inspire your career ambitions.</p>
            </div>

          </div>
          <div className='w-80 h-44 shadow-lg border border-neutral-300 rounded-md  flex flex-col items-start justify-center  px-4 gap-4 '>
            <h2 className='text-2xl font-semibold text-neutral-900 '>Explore Job Openings</h2>
            <p className='text-sm text-neutral-600 '>Explore a wide array of exciting job openings across various industries that pique your interest and inspire your career ambitions.</p>
          </div>
        </div>
      </div>
    </div>
  )
}


const ArrowRight = ({ className }: { className?: string }) => {
  const pathD = "M0 1 H231.5 A10 10 0 0 1 241.5 11 V80"

  return (
    <svg
      className={cn('absolute top-1/2 -translate-y-1/2 z-10', className)}
      xmlns="http://www.w3.org/2000/svg"
      width="249"
      height="81"
      viewBox="0 0 249 81"
      fill="none"
    >

      <defs>
        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d2d5d9" />
          <stop offset="100%" stopColor="#27e85b" />
        </linearGradient>
      </defs>


      <path
        d={pathD}
        stroke="#e5e7eb"
        strokeWidth="2"
        strokeDasharray="6 6"
        fill="none"
      />


      <motion.path
        d={pathD}
        stroke="url(#lineGradient)"
        strokeWidth="3"
        fill="none"
        strokeDasharray="30 210"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -240 }}
        transition={{
          duration: 2,
          ease: "linear",
          repeat: Infinity,
        }}
      />


      <path
        d="M241.5 80 L235 74 M241.5 80 L248 74"
        stroke="#9ca3af"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}



const ArrowLeft = ({ className }: { className?: string }) => {
  const pathD = "M249 1 H17 A10 10 0 0 0 7 11 V80"

  return (
    <svg
      className={cn("absolute top-1/2 -translate-y-1/2 z-0", className)}
      xmlns="http://www.w3.org/2000/svg"
      width="249"
      height="81"
      viewBox="0 0 249 81"
      fill="none"
    >

      <path
        d={pathD}
        stroke="#e5e7eb"
        strokeWidth="2"
        strokeDasharray="6 6"
        fill="none"
      />


      <motion.path
        d={pathD}
        stroke="limegreen"
        strokeWidth="3"
        fill="none"
        strokeDasharray="30 210"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -240 }}
        transition={{
          duration: 2,
          ease: "linear",
          repeat: Infinity,
        }}
      />

      {/* Arrow head */}
      <path
        d="M7 80 L13 74 M7 80 L1 74"
        stroke="#9ca3af"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}